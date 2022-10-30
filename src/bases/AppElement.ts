import type { applications, kernel, messaging } from "..";
import { KernelElement } from "./KernelElement";

export abstract class AppElement
  extends KernelElement
  implements applications.IAppElement
{
  constructor(
    readonly name: string,
    readonly kernel: kernel.IKernel,
    readonly parent?: kernel.IKernelElement,
    readonly subscriptions?: string[]
  ) {
    super(name, kernel, parent, subscriptions);
  }

  async execute(): Promise<number> {
    this.log.debug("execution begin");
    await this.onStart();
    const rc = await this.main();
    await this.onStop();
    this.log.debug("execution ended with code", rc);
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

  protected async onStart(): Promise<void> {
    this.log.debug("onStart");
    if (this.substriptions != null) {
      await Promise.all(
        this.substriptions.map(
          async (item) => await this.kernel.messaging.subscribeTopic(item, this)
        )
      );
    }
    this.log.debug("onStarted");
  }

  protected async onStop(): Promise<void> {
    this.log.debug("onStop");
    if (this.substriptions != null) {
      await Promise.all(
        this.substriptions.map(
          async (item) =>
            await this.kernel.messaging.unsubscribeTopic(item, this.fullName)
        )
      );
    }
    this.log.debug("onStopped");
  }

  protected async main(): Promise<number> {
    await this.waitForShutdown();
    return 0;
  }

  async onMessage(message: messaging.IMessageEvent): Promise<void> {}
}
