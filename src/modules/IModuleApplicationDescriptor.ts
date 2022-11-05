import { IAppElement } from "../applications/IAppElement";
import { ISession } from "../sessions";

export interface IModuleApplicationDescriptor {
  name: string;
  ctor: IModuleApplicationCtor;
}

export type IModuleApplicationCtor = (session: ISession) => IAppElement;
