import { ISessionFact } from "./ISessionFact";

export interface ISessionFactReply extends ISessionFact {
  type: "reply";
}
