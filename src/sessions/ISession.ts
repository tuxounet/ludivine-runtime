import { IOutputMessage } from "../channels/IOutputMessage";
import { IKernelElement } from "../kernel/IKernelElement";

export interface ISession extends IKernelElement {
  output: (out: IOutputMessage) => Promise<void>;
  terminate: () => Promise<boolean>;
}
