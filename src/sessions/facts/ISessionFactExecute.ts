import { ISessionFact } from "./ISessionFact";

export interface ISessionFactExecute extends ISessionFact {
  type: "execute";
}
