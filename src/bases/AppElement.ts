import { IAppElement } from "../applications/IAppElement";
import { logMethod } from "../logging/decorators/LogMethod";
import { IMessageEvent } from "../messaging/IMessageEvent";
import { ISession } from "../sessions/ISession";
import { KernelElement } from "./KernelElement";

export abstract class AppElement extends KernelElement implements IAppElement {
  constructor(
    readonly name: string,
    readonly session: ISession,
    readonly subscriptions?: string[]
  ) {
    super(name, session.kernel, session, subscriptions);
  }

  @logMethod()
  async execute(): Promise<number> {
    await this.onStart();
    const rc = await this.main();
    await this.onStop();
    return rc;
  }

  @logMethod()
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

  @logMethod()
  protected async main(): Promise<number> {
    await this.waitForShutdown();
    return 0;
  }

  async onMessage(message: IMessageEvent): Promise<void> {}
}
