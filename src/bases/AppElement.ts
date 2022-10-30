import type { applications, kernel, messaging } from "..";
import { logMethod } from "../logging";
import { KernelElement } from "./KernelElement";

export abstract class AppElement
  extends KernelElement
  implements applications.IAppElement
{
  constructor(
    readonly name: string,
    readonly kernel: kernel.IKernel,
    readonly parent: kernel.IKernelElement,
    readonly subscriptions?: string[]
  ) {
    super(name, kernel, parent, subscriptions);
  }

  async execute(): Promise<number> {
    await this.onStart();
    const rc = await this.main();
    await this.onStop();
    return rc;
  }

  protected async waitForShutdown(): Promise<void> {
    let loopinterval: NodeJS.Timer;
    await new Promise<void>((resolve) => {
      loopinterval = setInterval(() => {
        if (!this.kernel.started) {
          clearInterval(loopinterval);
          resolve();
        }
      }, 50);
    });
  }

  @logMethod()
  protected async onStart(): Promise<void> {
    if (this.substriptions != null) {
      await Promise.all(
        this.substriptions.map(
          async (item) => await this.kernel.messaging.subscribeTopic(item, this)
        )
      );
    }
  }

  @logMethod()
  protected async onStop(): Promise<void> {
    if (this.substriptions != null) {
      await Promise.all(
        this.substriptions.map(
          async (item) =>
            await this.kernel.messaging.unsubscribeTopic(item, this.fullName)
        )
      );
    }
  }

  protected async main(): Promise<number> {
    await this.waitForShutdown();
    return 0;
  }

  async onMessage(message: messaging.IMessageEvent): Promise<void> {}
}
