import { IInputQuery } from "../channels/IInputQuery";
import { IInputMessage } from "../channels/IInputMessage";
import { IOutputMessage } from "../channels/IOutputMessage";
import { IKernelElement } from "../kernel/IKernelElement";
import { IMessageEvent } from "../messaging/IMessageEvent";
export interface ISessionReplyWaiter {
  sequence: string;
  resolver: (ev: IMessageEvent) => void;
  rejecter: (e: Error) => void;
}
export interface ISession extends IKernelElement {
  id: string;
  output: (out: IOutputMessage) => Promise<void>;
  input: (input: IInputQuery) => Promise<IInputMessage<string>>;
  terminate: () => Promise<boolean>;
}
