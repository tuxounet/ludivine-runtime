import { IKernelElement } from "../kernel";
import { IRuntimeModule, IRuntimeModuleSource } from "./IRuntimeModule";

export interface IModulesBroker extends IKernelElement {
  readonly modules: Map<string, IRuntimeModule>;
  findModule: (name: string) => Promise<IRuntimeModule | undefined>;
  registerModule: (source: IRuntimeModuleSource) => Promise<IRuntimeModule>;
  unregisterModule: (name: string) => Promise<boolean>;
}
