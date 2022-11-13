import { IKernelElement } from "../kernel";
import { IModuleApplicationDescriptor } from "./IModuleApplicationDescriptor";
import { IModuleEndpointDescriptor } from "./IModuleEndpointDescriptor";
import { IRuntimeModule, IRuntimeModuleSource } from "./IRuntimeModule";

export interface IModulesBroker extends IKernelElement {
  readonly modules: Map<string, IRuntimeModule>;
  findModule: (name: string) => Promise<IRuntimeModule | undefined>;
  registerModule: (source: IRuntimeModuleSource) => Promise<IRuntimeModule>;
  unregisterModule: (name: string) => Promise<boolean>;
  findApplicationDescriptor: (
    name: string
  ) => Promise<IModuleApplicationDescriptor | undefined>;

  findEndpointsDescriptor: (
    name: string
  ) => Promise<IModuleEndpointDescriptor | undefined>;
}
