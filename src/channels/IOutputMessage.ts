export type IOutputMessageType = "message" | "object" | "input";
export interface IOutputMessage {
  type: IOutputMessageType;
  body: string;
}
