import "reflect-metadata";
import { KernelElement } from "../bases/KernelElement";
import { BasicError } from "../errors/BasicError";
import { IKernel } from "../kernel/IKernel";
import { IKernelBroker } from "../kernel/IKernelBroker";
import { logMethod } from "../logging/decorators/LogMethod";
export const CLASS_KEY = "ioc:tagged_class";
export const PROPS_KEY = "ioc:inject_props";

interface ContainerRegistration {
  clazz: any;
  constructorArgs?: any[];
}

export class Container extends KernelElement {
  constructor(readonly kernel: IKernel) {
    super("ioc", kernel);
    this.registrations = new Map();
    this.instances = new Map();
  }

  registrations: Map<string, ContainerRegistration>;
  instances: Map<string, IKernelBroker>;

  @logMethod()
  registerType(identifier: string, clazz: any, constructorArgs?: any[]): void {
    this.registrations.set(identifier, {
      clazz,
      constructorArgs,
    });
  }

  @logMethod()
  registerInstance(identifier: string, instance: IKernelBroker): void {
    this.instances.set(identifier, instance);
  }

  @logMethod()
  async initialize(bootOrder?: string[]): Promise<void> {
    const keys =
      bootOrder != null ? bootOrder : Array.from(this.registrations.keys());

    // instanciate
    keys.map((item) => this.get(item));

    // initialize
    for (const key of keys) {
      const instance = this.get(key);
      if (instance == null)
        throw BasicError.notFound(this.fullName, "initialize/instance", key);
      await instance.initialize();
    }

    await super.initialize();
  }

  @logMethod()
  get<T extends IKernelBroker>(identifier: string): T {
    const instance = this.instances.get(identifier);
    if (instance != null) {
      return instance as T;
    }

    const target = this.registrations.get(identifier);
    if (target == null)
      throw BasicError.notFound(this.fullName, "registration", identifier);
    const { clazz, constructorArgs } = target;
    const props = Reflect.getMetadata(PROPS_KEY, clazz);
    const inst = Reflect.construct(
      clazz,
      constructorArgs != null ? constructorArgs : []
    );
    for (const prop in props) {
      const identifier = props[prop].value;
      // get injected object recursively
      inst[prop] = this.get(identifier);
    }

    this.instances.set(identifier, inst);
    return inst;
  }

  @logMethod()
  async shutdown(bootOrder?: string[]): Promise<void> {
    const keys =
      bootOrder != null ? bootOrder : Array.from(this.registrations.keys());
    keys.reverse();

    for (const key of keys) {
      const instance = this.instances.get(key);
      if (instance != null) await instance.shutdown();
    }

    this.instances.clear();
    this.registrations.clear();
    await super.shutdown();
  }
}
