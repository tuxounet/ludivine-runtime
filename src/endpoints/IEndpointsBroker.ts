import { EndpointRouteMethod } from "./IEndpointRoute";

import { IKernelElement } from "../kernel/IKernelElement";
import { IEndpointRouteHandler } from "./IEndpointRouteHandler";
export interface IEndpointsBroker extends IKernelElement {
  registerRoute: (
    method: EndpointRouteMethod,
    path: string,
    handler: IEndpointRouteHandler
  ) => Promise<void>;
}
