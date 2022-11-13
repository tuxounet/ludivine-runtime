import { IStorageFile } from "../../storage/files/IStorageFile";
import { ISessionFact } from "../facts";

export interface ISessionFile extends IStorageFile {
  body: {
    id: number;
    state: string;
    sequence: number;
    facts: ISessionFact[];
  };
}
