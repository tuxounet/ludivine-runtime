import { IKernelBroker } from "../kernel/IKernelBroker";
import { ISession } from "./ISession";

export interface ISessionsBroker extends IKernelBroker {
  begin: () => Promise<string>;
  get: (id: string) => Promise<ISession>;
  terminate: (id: string) => Promise<boolean>;
}
