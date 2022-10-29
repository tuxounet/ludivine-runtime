import { IKernelElement } from "../kernel/IKernelElement";
import { ILogLine } from "./ILogLine";

export interface ILogBroker extends IKernelElement {
  output: (line: ILogLine) => void;
}
