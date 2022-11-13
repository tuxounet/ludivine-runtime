import { IKernelBroker } from "../kernel/IKernelBroker";

export interface IConfigBroker extends IKernelBroker {
  load: () => Promise<void>;
  persist: () => Promise<void>;
  get: <T = string>(key: string, defaultValue: T) => Promise<T>;
  has: (key: string) => Promise<boolean>;
  set: <T = string>(key: string, value: T) => Promise<void>;
}
