export interface IInputMessage<T = Record<string, unknown>>
  extends Record<string, unknown> {
  sender: string;
  value: T;
  type: "line" | "object";
  sequence?: string;
}
