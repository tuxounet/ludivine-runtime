import { Logger } from "../logging";
import { IMessageEvent } from "../messaging/IMessageEvent";
import { IKernel } from "./IKernel";

export interface IKernelElement {
  readonly fullName: string;
  readonly parent?: IKernelElement;
  readonly kernel: IKernel;
  log: Logger;
  initialize: () => Promise<void>;
  shutdown: () => Promise<void>;
  onMessage?: (message: IMessageEvent) => Promise<void>;
}
