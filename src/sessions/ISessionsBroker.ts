import { IKernelBroker } from "../kernel/IKernelBroker";
import { ISession } from "./ISession";

export interface ISessionsBroker extends IKernelBroker {
  begin: () => Promise<number>;
  get: (id: number) => Promise<ISession>;
  terminate: (id: number) => Promise<boolean>;
}
