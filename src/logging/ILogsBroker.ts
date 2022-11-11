import { IKernelElement } from "../kernel/IKernelElement";
import { ILogLine } from "./ILogLine";

export interface ILogsBroker extends IKernelElement {
  output: (line: ILogLine) => void;
}
