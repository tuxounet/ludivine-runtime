import { KernelElement } from "../bases";
import { IKernel } from "../kernel";
import { IKernelElement } from "../kernel/IKernelElement";
import { logMethod } from "../logging/decorators/LogMethod";
import { IMessageEvent } from "./IMessageEvent";
export class Topic extends KernelElement {
  constructor(
    readonly id: string,
    readonly kernel: IKernel,
    readonly parent: IKernelElement
  ) {
    super(`topic<${id}>`, kernel, parent);
  }

  observers: Map<string, IKernelElement> = new Map();

  @logMethod()
  register(observer: IKernelElement): void {
    this.observers.set(observer.fullName, observer);
  }

  @logMethod()
  unregister(observerName: string): void {
    this.observers.delete(observerName);
  }

  @logMethod()
  async notify(message: Record<string, string>): Promise<void> {
    const ev: IMessageEvent = {
      sender: this.fullName,
      recipient: this.id,
      date: new Date().toISOString(),
      body: message,
    };
    await Promise.all(
      Array.from(this.observers.values()).map((item) => {
        if (item.onMessage != null) return item.onMessage(ev);
        else return undefined;
      })
    );
  }
}
