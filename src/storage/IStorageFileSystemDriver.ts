import { IKernelElement } from "../kernel/IKernelElement";

export interface IStorageFileSystemDriverEntry<T = Record<string, unknown>> {
  path: string;
  provider: string;
  body?: T;
}

export interface IStorageFileSystemDriver extends IKernelElement {
  readonly id: string;
  properties: Record<string, unknown>;
  // bind: () => Promise<boolean>;
  // unbind: () => Promise<boolean>;
  list: (path: string) => Promise<IStorageFileSystemDriverEntry[]>;
  existsFile: (path: string) => Promise<boolean>;
  createDirectory: (path: string) => Promise<boolean>;
  createTempDirectory: () => Promise<string>;
  existsDirectory: (path: string) => Promise<boolean>;
  getRealPath: (path: string) => Promise<string>;
  getRelativePath: (path: string) => Promise<string>;
  readTextFile: (
    path: string
  ) => Promise<IStorageFileSystemDriverEntry<string>>;
  readObjectFile: <T = Record<string, unknown>>(
    path: string
  ) => Promise<IStorageFileSystemDriverEntry<T>>;
  readFile: (
    path: string
  ) => Promise<IStorageFileSystemDriverEntry<Uint8Array>>;
  writeTextFile: (path: string, body: string) => Promise<boolean>;
  writeObjectFile: <T = Record<string, unknown>>(
    path: string,
    body: T
  ) => Promise<boolean>;
  writeFile: (path: string, body: Uint8Array) => Promise<boolean>;
  appendFile: (path: string, body: Uint8Array) => Promise<boolean>;
  deleteFile: (path: string) => Promise<boolean>;
  deleteDirectory: (path: string) => Promise<boolean>;
}
