import { IKernelElement } from "../kernel/IKernelElement";

export interface IObservableElement {
  register: (observer: IKernelElement) => void;
  unregister: (observerName: string) => void;
}
