import { IKernelElement } from "../kernel/IKernelElement";

export interface IEndpoint extends IKernelElement {
  renderUI: () => Promise<void>;
  listenAPI: () => Promise<void>;
}
