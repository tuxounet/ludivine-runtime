import { IKernelBroker } from "../kernel/IKernelBroker";

import { ISession } from "../sessions/ISession";
import { IEndpoint } from "./IEndpoint";
export interface IEndpointsBroker extends IKernelBroker {
  openEndpoint: (session: ISession, type: string) => Promise<void>;
  get: (session: string) => Promise<IEndpoint>;
  closeEndpoint: (session: string) => Promise<void>;
}
