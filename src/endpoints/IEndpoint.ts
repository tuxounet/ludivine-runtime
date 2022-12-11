import { IKernelElement } from "../kernel/IKernelElement";

export interface IEndpoint extends IKernelElement {
  open: () => Promise<void>;
  close: () => Promise<void>;
}
