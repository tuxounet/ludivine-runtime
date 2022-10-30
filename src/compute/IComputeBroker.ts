import { IKernelElement } from "../kernel/IKernelElement";
import { IStorageVolume } from "../storage";

import { IComputeDependency, IComputeExecuteResult } from "./IComputeRuntime";

export interface IComputeBroker extends IKernelElement {
  executeEval: (
    runtime: string,
    strToEval: string,
    runVolume: IStorageVolume
  ) => Promise<IComputeExecuteResult>;

  executeSource: (
    runtime: string,
    sourceVolume: IStorageVolume,
    dependencies: IComputeDependency[],
    entryPoint: string,
    args?: string[]
  ) => Promise<IComputeExecuteResult>;
}
