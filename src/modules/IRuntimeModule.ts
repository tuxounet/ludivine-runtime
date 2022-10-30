import { IComputeDependency } from "../compute";
import { IModuleDefinition } from "../modules";

export interface IRuntimeModule {
  id: string;
  source: IRuntimeModuleSource;
  definition: IModuleDefinition;
}

export interface IRuntimeModuleSource {
  name: string;
  upstream: string;
  version?: string;
  dependencies?: IComputeDependency[];
}
