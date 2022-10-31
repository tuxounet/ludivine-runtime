import { IEventMessage } from "../channels/IEventMessage";
import { IOutputMessage } from "../channels/IOutputMessage";
import { IKernelElement } from "../kernel/IKernelElement";
import { ISession } from "../sessions/ISession";

export interface IEndpoint extends IKernelElement {
  readonly session: ISession;
  emitOutput: (output: IOutputMessage) => Promise<void>;
  emitEvent: (output: IEventMessage) => Promise<void>;
}
