import { IKernel } from "../kernel/IKernel";
import { IKernelElement } from "../kernel/IKernelElement";
import { logMethod } from "../logging/decorators/LogMethod";
import { ILogLine } from "../logging/ILogLine";
import { Logger } from "../logging/Logger";

export abstract class KernelElement implements IKernelElement {
  constructor(
    readonly name: string,
    readonly kernel: IKernel,
    readonly parent?: IKernelElement,
    readonly substriptions?: string[]
  ) {
    this.log = new Logger(this, (line: ILogLine) => {
      this.kernel.logs.output(line);
    });
  }

  @logMethod()
  async initialize(): Promise<void> {
    this.log.debug("initialzed");
  }

  @logMethod()
  async shutdown(): Promise<void> {
    this.log.debug("stopped");
  }

  readonly log: Logger;
  get fullName(): string {
    if (this.parent != null) {
      return this.parent.fullName + "." + this.name;
    } else {
      return this.kernel.nickname + "." + this.name;
    }
  }
}
