import { IKernelElement } from "../kernel/IKernelElement";
import { IStorageVolume } from "../storage";

import {
  IComputeSourceCode,
  IComputeExecuteResult,
  IComputeProjectCode,
} from "./IComputeRuntime";

export interface IComputeBroker extends IKernelElement {
  executeEval: (
    runtime: string,
    strToEval: string,
    runVolume: IStorageVolume
  ) => Promise<IComputeExecuteResult>;

  executeSource: (
    runtime: string,
    source: IComputeSourceCode
  ) => Promise<IComputeExecuteResult>;

  executeProject: (
    runtime: string,
    project: IComputeProjectCode
  ) => Promise<IComputeExecuteResult>;
}
