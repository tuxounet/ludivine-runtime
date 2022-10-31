import { IKernelElement } from "../kernel/IKernelElement";

import { ISession } from "../sessions/ISession";
import { IEndpoint } from "./IEndpoint";
export interface IEndpointsBroker extends IKernelElement {
  openEndpoint: (session: ISession, type: string) => Promise<void>;
  get: (session: string) => Promise<IEndpoint>;
  closeEndpoint: (session: string) => Promise<void>;
}
