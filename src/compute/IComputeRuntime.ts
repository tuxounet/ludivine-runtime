import { IStorageVolume } from "../storage/IStorageVolume";

export interface IComputeDependency {
  name: string;
  version?: string;
}

export interface IComputeCommandDependency {
  name: string;
}

export interface IComputeExecuteResult {
  rc: number;
  output: string;
  errors: string;
}

export interface IComputeRuntime {
  name: string;
  commandsDependencies: IComputeCommandDependency[];
  provision: () => Promise<boolean>;
  unprovision: () => Promise<boolean>;
  ensureCommandDependencies: () => Promise<void>;
  ensureDependencies: (
    deps: IComputeDependency[],
    runVolume: IStorageVolume
  ) => Promise<void>;
  executeEval: (
    strToEval: string,
    runVolume: IStorageVolume
  ) => Promise<IComputeExecuteResult>;

  executeSource: (
    sourceVolume: IStorageVolume,
    dependencies: IComputeDependency[],
    entryPoint: string,
    args?: string[] | undefined
  ) => Promise<IComputeExecuteResult>;
}
