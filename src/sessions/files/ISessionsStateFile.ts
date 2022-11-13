import { IStorageFile } from "../../storage/files";
import { ISessionDescriptor } from "./ISessionDescriptor";

export interface ISessionsStateFile extends IStorageFile {
  body: {
    sequence: number;
    sessions: ISessionDescriptor[];
  };
}
