import { IAppElement } from "../applications/IAppElement";
import { IKernel } from "../kernel";
import { IKernelElement } from "../kernel/IKernelElement";

export interface IModuleApplicationDescriptor {
  name: string;
  ctor: IModuleApplicationCtor;
}

export type IModuleApplicationCtor = (
  kernel: IKernel,
  parent?: IKernelElement
) => IAppElement;
