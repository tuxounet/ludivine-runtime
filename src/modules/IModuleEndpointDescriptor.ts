import { IEndpoint } from "../endpoints/IEndpoint";
import { IEndpointsBroker } from "../endpoints/IEndpointsBroker";

export interface IModuleEndpointDescriptor {
  name: string;
  ctor: IModuleEndpointCtor;
}

export type IModuleEndpointCtor = (endpoints: IEndpointsBroker) => IEndpoint;
