import { ObservableElement } from "../bases/ObservableElement";
import { IKernel } from "../kernel/IKernel";
import { IKernelElement } from "../kernel/IKernelElement";
import { logMethod } from "../logging/decorators/LogMethod";
import { IMessageEvent } from "./IMessageEvent";
export class Topic extends ObservableElement {
  constructor(
    readonly name: string,
    readonly kernel: IKernel,
    readonly parent: IKernelElement
  ) {
    super(name, kernel, parent);
  }

  @logMethod()
  async publish(message: Record<string, string>): Promise<void> {
    const ev: IMessageEvent = {
      sender: this.fullName,
      recipient: this.name,
      date: new Date().toISOString(),
      body: message,
    };
    await this.notifyAll(ev);
  }
}
