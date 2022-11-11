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

  run: (args: string[]) => Promise<number>;
  askShutdown: () => Promise<void>;
  waitForShutdown(sender: string): Promise<void>;
}
