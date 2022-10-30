import { IKernelElement } from "../kernel/IKernelElement";
import { IAppElement } from "./IAppElement";

export interface IApplicationsBroker extends IKernelElement {
  executeAndWait: (app: IAppElement) => Promise<number>;
  executeRootProcess: () => Promise<number>;
  launchApplication: (name: string) => Promise<number>;
}
