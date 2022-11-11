import { Container } from "../ioc/Container";
import { ILogsBroker } from "../logging/ILogsBroker";
import { IKernelOptions } from "./IKernelOptions";

export interface IKernel {
  readonly version: string;
  readonly container: Container;
  readonly nickname: string;
  started: boolean;
  options: IKernelOptions;
  logs: ILogsBroker;

  run: (commandLine?: string[]) => Promise<number>;
  askShutdown: () => Promise<void>;
}
