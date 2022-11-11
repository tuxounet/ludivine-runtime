import { IKernelBroker } from "../kernel/IKernelBroker";
import { IStorageVolume } from "../storage";

import { IComputeDependency, IComputeExecuteResult } from "./IComputeRuntime";

export interface IComputeBroker extends IKernelBroker {
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
