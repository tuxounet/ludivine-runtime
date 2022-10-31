import { IKernelElement } from "../kernel/IKernelElement";

export interface IMessagingBroker extends IKernelElement {
  subscribeTopic: (topic: string, observer: IKernelElement) => Promise<void>;
  unsubscribeTopic: (topic: string, observer: string) => Promise<void>;

  publish: (topic: string, message: Record<string, string>) => Promise<void>;
}
