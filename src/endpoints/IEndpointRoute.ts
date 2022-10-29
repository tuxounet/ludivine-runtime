import { IEndpointRouteHandler } from "./IEndpointRouteHandler";
export type EndpointRouteMethod = "GET" | "POST" | "ALL";
export interface IEndpointRoute {
  path: string;
  method: EndpointRouteMethod;
  handler: IEndpointRouteHandler;
}
