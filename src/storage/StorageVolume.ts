import type { kernel, storage } from "..";
import { KernelElement } from "../bases/KernelElement";

export class StorageVolume
  extends KernelElement
  implements storage.IStorageVolume
{
  constructor(
    name: string,
    readonly id: string,
    readonly readonly: boolean,
    readonly ephemeral: boolean,
    readonly paths: storage.IStoragePathsDriver,
    readonly fileSystem: storage.IStorageFileSystemDriver,
    readonly kernel: kernel.IKernel,
    readonly parent: kernel.IKernelElement
  ) {
    super(name, kernel, parent);
  }

  async initialize(): Promise<void> {
    await this.paths.initialize();
    await this.fileSystem.initialize();
  }

  async shutdown(): Promise<void> {
    await this.fileSystem.shutdown();
    await this.paths.shutdown();
  }
}
