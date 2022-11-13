import { ISessionFact } from "./ISessionFact";
export type ISessionFactOutputKind = "message" | "object" | "input";

export interface ISessionFactOutput extends ISessionFact {
  type: "output";
  kind: ISessionFactOutputKind;
  body: string;
}
