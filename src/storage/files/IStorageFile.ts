import { IStorageFileMetadata } from "./IStorageFileMetadata";

export interface IStorageFile {
  metadata: IStorageFileMetadata;
  body: Record<string, unknown>;
}
