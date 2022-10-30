import { IApplicationsBroker } from "../applications/IApplicationsBroker";
import { IChannelsBroker } from "../channels/IChannelsBroker";
import { IComputeBroker } from "../compute/IComputeBroker";
import { IEndpointsBroker } from "../endpoints/IEndpointsBroker";
import { ILogBroker } from "../logging/ILogBroker";
import { IMessagingBroker } from "../messaging/IMessagingBroker";
import { IModulesBroker } from "../modules";
import { IStorageBroker } from "../storage/IStorageBroker";

export interface IKernel {
  readonly version: string;
  started: boolean;
  applications: IApplicationsBroker;
  logging: ILogBroker;
  storage: IStorageBroker;
  endpoints: IEndpointsBroker;
  messaging: IMessagingBroker;
  compute: IComputeBroker;
  channels: IChannelsBroker;
  modules: IModulesBroker;
  readonly fullName: string;
  initialize: () => Promise<void>;
  shutdown: () => Promise<void>;
  askShutdown: () => Promise<void>;
}
