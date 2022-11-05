import { IKernelElement } from "../kernel/IKernelElement";

export interface IApplicationsBroker extends IKernelElement {
  executeRootProcess: () => Promise<number>;
  launchApplication: (sessionId: string, name: string) => Promise<number>;
}
