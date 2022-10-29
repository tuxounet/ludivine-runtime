import type { kernel, messaging } from "..";
import { KernelElement } from "./KernelElement";

export abstract class ObservableElement
  extends KernelElement
  implements messaging.IObservableElement
{
  constructor(
    readonly name: string,
    readonly kernel: kernel.IKernel,
    readonly parent: kernel.IKernelElement,
    readonly subscriptions?: string[]
  ) {
    super(name, kernel, parent, subscriptions);
    this.observers = new Map();
  }

  observers: Map<string, kernel.IKernelElement>;

  register(observer: kernel.IKernelElement): void {
    this.observers.set(observer.fullName, observer);
  }

  unregister(observerName: string): void {
    this.observers.delete(observerName);
  }

  protected async notifyAll(message: messaging.IMessageEvent): Promise<void> {
    const proms: Array<Promise<void>> = [];
    for (const observer of this.observers.values()) {
      if (observer.onMessage != null) {
        proms.push(observer.onMessage(message));
      }
    }
    await Promise.all(proms);
  }
}
