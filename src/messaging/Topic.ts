import { ObservableElement } from "../bases/ObservableElement";

import type { kernel, messaging } from "..";
export class Topic extends ObservableElement {
  constructor(
    readonly name: string,
    readonly kernel: kernel.IKernel,
    readonly parent: kernel.IKernelElement
  ) {
    super(name, kernel, parent);
  }

  async publish(message: Record<string, string>): Promise<void> {
    this.log.debug("publishing", message);
    const ev: messaging.IMessageEvent = {
      sender: this.fullName,
      recipient: this.name,
      date: new Date().toISOString(),
      body: message,
    };
    await this.notifyAll(ev);
    this.log.debug("published", message);
  }
}
