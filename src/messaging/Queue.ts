import { KernelElement } from "../bases/KernelElement";
import { BasicError } from "../errors/BasicError";

import { IKernel } from "../kernel/IKernel";
import { IKernelElement } from "../kernel/IKernelElement";

export class Queue<T = Record<string, unknown>> extends KernelElement {
  constructor(
    readonly id: string,
    readonly kernel: IKernel,
    readonly parent: IKernelElement
  ) {
    super(`queue<${id}>`, kernel, parent);
    this.q = [];
  }

  q: T[];
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
