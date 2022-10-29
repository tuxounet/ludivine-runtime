import { ObservableElement } from "../bases/ObservableElement";
import { BasicError } from "../errors/BasicError";
import type { kernel } from "..";
export class Queue<T = Record<string, unknown>> extends ObservableElement {
  q: T[];
  constructor(
    name: string,
    readonly kernel: kernel.IKernel,
    readonly parent: kernel.IKernelElement
  ) {
    super(name, kernel, parent);
    this.q = [];
  }

  enqueue(item: T): void {
    this.q.push(item);
  }

  canDequeue(): boolean {
    return this.q.length > 0;
  }

  dequeue(): T {
    const msg = this.q.shift();
    if (msg === undefined)
      throw BasicError.badQuery(this.fullName, "queue", "dequeue");
    return msg;
  }
}
