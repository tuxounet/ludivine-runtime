import { IKernelBroker } from "../kernel/IKernelBroker";

export interface IApplicationsBroker extends IKernelBroker {
  executeRootProcess: () => Promise<number>;
  launchApplication: (sessionId: string, name: string) => Promise<number>;
}
