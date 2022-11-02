export type IEventMessageType = "info" | "warn" | "input";
export interface IEventMessage<T = string> {
  type: IEventMessageType;
  body: T;
}
