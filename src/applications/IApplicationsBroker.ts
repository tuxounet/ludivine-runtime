import { IKernelBroker } from "../kernel/IKernelBroker";

export interface IApplicationsBroker extends IKernelBroker {
  eval: (sessionId: string, request: string) => Promise<number>;
  launchApplication: (sessionId: string, name: string) => Promise<number>;
}
