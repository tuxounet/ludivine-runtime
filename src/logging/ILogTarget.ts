import { IKernelElement } from "../kernel/IKernelElement";
import { ILogLine } from "./ILogLine";
import { LogLevel } from "./LogLevel";

export interface ILogTarget extends IKernelElement {
  level: LogLevel;

  appendLog: (line: ILogLine) => void;
}
