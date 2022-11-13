import { IKernelBroker } from "../kernel/IKernelBroker";

export interface IApplicationsBroker extends IKernelBroker {
  eval: (sessionId: number, request: string) => Promise<number>;
  launchApplication: (sessionId: number, name: string) => Promise<number>;
}
