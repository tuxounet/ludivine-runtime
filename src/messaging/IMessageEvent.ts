export interface IMessageEvent<T = Record<string, unknown>> {
  date: string;
  sender: string;
  recipient: string;
  body: T;
  sequence?: string;
}
