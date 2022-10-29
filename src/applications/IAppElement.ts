import { IKernelElement } from "../kernel/IKernelElement";
import { IMessageEvent } from "../messaging/IMessageEvent";

export interface IAppElement extends IKernelElement {
  onMessage: (message: IMessageEvent) => Promise<void>;
  execute: () => Promise<number>;
}
