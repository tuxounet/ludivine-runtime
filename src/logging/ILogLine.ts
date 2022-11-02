import { LogLevel } from "./LogLevel";

export interface ILogLine {
  level: LogLevel;
  sender: string;
  date: string;
  line: string;
}
