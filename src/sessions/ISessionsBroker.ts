import { IKernelElement } from "../kernel/IKernelElement";
import { ISession } from "./ISession";

export interface ISessionsBroker extends IKernelElement {
  begin: () => Promise<string>;
  get: (id: string) => Promise<ISession>;
  terminate: (id: string) => Promise<boolean>;
}
