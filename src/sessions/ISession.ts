import { IKernelElement } from "../kernel/IKernelElement";
import { IMessageEvent } from "../messaging/IMessageEvent";
import { ISessionFact } from "./facts/ISessionFact";
import { ISessionFactOutputKind } from "./facts/ISessionFactOutput";
export interface ISessionReplyWaiter {
  sequence: string;
  resolver: (ev: IMessageEvent) => void;
  rejecter: (e: Error) => void;
}
export interface ISession extends IKernelElement {
  id: number;
  state: string;
  facts: ISessionFact[];
  sequence: number;

  ask: (prompt: string) => Promise<void>;
  output: (body: string, kind: ISessionFactOutputKind) => Promise<void>;
  terminate: () => Promise<boolean>;
}
