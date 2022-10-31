import { KernelElement } from "../bases/KernelElement";
import { IKernelElement } from "../kernel/IKernelElement";
import { ILogLine } from "./ILogLine";
import { LogLevel } from "./LogLevel";

export class Logger {
  constructor(
    readonly sender: IKernelElement,
    readonly callback: (line: ILogLine) => void
  ) {}

  emit(level: LogLevel, ...messageParts: unknown[]): void {
    this.callback({
      level: level,
      date: this.toTimeString(),
      sender: this.sender.fullName,
      line: this.buildOutput(...messageParts),
    });
  }

  trace(...messageParts: unknown[]): void {
    this.callback({
      level: LogLevel.TRACE,
      date: this.toTimeString(),
      sender: this.sender.fullName,
      line: this.buildOutput(...messageParts),
    });
  }

  debug(...messageParts: unknown[]): void {
    this.callback({
      level: LogLevel.DEBUG,
      date: this.toTimeString(),
      sender: this.sender.fullName,
      line: this.buildOutput(...messageParts),
    });
  }

  input(...messageParts: unknown[]): void {
    this.callback({
      level: LogLevel.INPUT,
      date: this.toTimeString(),
      sender: this.sender.fullName,
      line: this.buildOutput(...messageParts),
    });
  }

  info(...messageParts: unknown[]): void {
    this.callback({
      level: LogLevel.INFO,
      date: this.toTimeString(),
      sender: this.sender.fullName,
      line: this.buildOutput(...messageParts),
    });
  }

  warn(...messageParts: unknown[]): void {
    this.callback({
      level: LogLevel.WARN,
      date: this.toTimeString(),
      sender: this.sender.fullName,
      line: this.buildOutput(...messageParts),
    });
  }

  error(...messageParts: unknown[]): void {
    this.callback({
      level: LogLevel.ERROR,
      date: this.toTimeString(),
      sender: this.sender.fullName,
      line: this.buildOutput(...messageParts),
    });
  }

  private buildOutput(...messageParts: unknown[]): string {
    return messageParts
      .map((item: any) => {
        if (typeof item === "string") return item;
        if (item instanceof Error)
          return `${item.name}: ${item.message} ${item.stack ?? ""}`;
        if (typeof item["fullName"] === "string")
          return `{${item["fullName"]}}`;
        if (item == null) return "NULL!";
        return JSON.stringify(item);
      })
      .join(" ");
  }

  private toTimeString(timestamp?: Date): string {
    if (timestamp == null) timestamp = new Date();

    const formatData = (input: number): string => {
      if (input > 9) {
        return String(input);
      } else return `0${input}`;
    };

    const format = {
      HH: formatData(timestamp.getHours()),
      MM: formatData(timestamp.getMinutes()),
      SS: formatData(timestamp.getSeconds()),
    };
    return `${format.HH}:${format.MM}:${format.SS}`;
  }
}
