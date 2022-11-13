import { IKernelBroker } from "../kernel/IKernelBroker";
import { IEndpoint } from "./IEndpoint";
export interface IEndpointsBroker extends IKernelBroker {
  openEndpoint: (name: string) => Promise<void>;
  get: (name: string) => Promise<IEndpoint>;
  closeEndpoint: (name: string) => Promise<void>;
}
