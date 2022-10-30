import type { kernel, logging } from "..";
import { Logger } from "../logging/Logger";
import { Observer } from "../messaging/Observer";

export abstract class KernelElement
  extends Observer
  implements kernel.IKernelElement
{
  constructor(
    readonly name: string,
    readonly kernel: kernel.IKernel,
    readonly parent?: kernel.IKernelElement,
    readonly substriptions?: string[]
  ) {
    super();
    this.log = new Logger(this, (line: logging.ILogLine) => {
      this.kernel.logging.output(line);
    });
  }

  async initialize(): Promise<void> {
    this.log.debug("initialzed");
  }

  async shutdown(): Promise<void> {
    this.log.debug("stopped");
  }

  readonly log: Logger;
  get fullName(): string {
    if (this.parent != null) {
      return this.parent.fullName + "." + this.name;
    } else {
      return this.kernel.fullName + "." + this.name;
    }
  }
}
