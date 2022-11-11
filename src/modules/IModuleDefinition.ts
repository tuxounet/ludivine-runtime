import { IModuleApplicationDescriptor } from "./IModuleApplicationDescriptor";
import { IModuleEndpointDescriptor } from "./IModuleEndpointDescriptor";
export interface IModuleDefinition {
  applications?: IModuleApplicationDescriptor[];
  endpoints?: IModuleEndpointDescriptor[];
}
