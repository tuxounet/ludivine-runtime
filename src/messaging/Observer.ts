import type { messaging } from "..";
export abstract class Observer {
  async onMessage?(messageEvent: messaging.IMessageEvent): Promise<void> {}
}
