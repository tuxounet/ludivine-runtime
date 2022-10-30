import { applications, kernel } from "..";

export type IModuleApplicationCtor = (
  kernel: kernel.IKernel,
  parent?: kernel.IKernelElement
) => applications.IAppElement;
