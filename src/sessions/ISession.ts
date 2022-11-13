import { IKernelElement } from "../kernel/IKernelElement";
import { IMessageEvent } from "../messaging/IMessageEvent";
import { ISessionFact } from "./facts/ISessionFact";
import { ISessionFactOutputKind } from "./facts/ISessionFactOutput";
import { ISessionFactReply } from "./facts/ISessionFactReply";
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
  waitForReply(sequence: number): Promise<ISessionFactReply>;
  ask: (prompt: string) => Promise<void>;
  output: (body: string, kind: ISessionFactOutputKind) => Promise<void>;
  terminate: () => Promise<boolean>;
}
