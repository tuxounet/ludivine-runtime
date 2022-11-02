import { KernelElement } from "../bases/KernelElement";
import { IKernel } from "../kernel/IKernel";
import { IKernelElement } from "../kernel/IKernelElement";
import { IStorageFileSystemDriver } from "./IStorageFileSystemDriver";
import { IStoragePathsDriver } from "./IStoragePathsDriver";
import { IStorageVolume } from "./IStorageVolume";

export class StorageVolume extends KernelElement implements IStorageVolume {
  constructor(
    name: string,
    readonly id: string,
    readonly readonly: boolean,
    readonly ephemeral: boolean,
    readonly paths: IStoragePathsDriver,
    readonly fileSystem: IStorageFileSystemDriver,
    readonly kernel: IKernel,
    readonly parent: IKernelElement
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
