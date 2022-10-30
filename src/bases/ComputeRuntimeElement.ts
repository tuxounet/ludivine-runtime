import { KernelElement } from "./KernelElement";
import commandExists from "command-exists";
import { IKernelElement } from "../kernel/IKernelElement";
import { IKernel } from "../kernel";
import { BasicError } from "../errors/BasicError";
import { IStorageVolume } from "../storage/IStorageVolume";
import {
  IComputeCommandDependency,
  IComputeDependency,
  IComputeExecuteResult,
  IComputeRuntime,
} from "../compute/IComputeRuntime";
import { exec } from "../sys/childProc";
import { logMethod } from "../logging";

export abstract class ComputeRuntimeElement
  extends KernelElement
  implements IComputeRuntime
{
  constructor(
    name: string,
    readonly commandPrefix: string,
    readonly evaluationSuffix: string,
    readonly kernel: IKernel,
    readonly parent: IKernelElement,
    subscriptions?: string[]
  ) {
    super(name, kernel, parent, subscriptions);
    this.commandsDependencies = [];
  }

  commandsDependencies: IComputeCommandDependency[];
  protected runDirectory?: string;

  @logMethod()
  async ensureCommandDependencies(): Promise<void> {
    const failed: IComputeDependency[] = [];
    for (const dep of this.commandsDependencies) {
      try {
        await commandExists(dep.name);
      } catch {
        failed.push(dep);
      }
    }
    if (failed.length > 0) {
      throw BasicError.notFound(
        this.name,
        "dependencies failed",
        failed.map((item) => item.name).join(",")
      );
    }
  }

  @logMethod()
  async provision(): Promise<boolean> {
    return true;
  }

  @logMethod()
  async unprovision(): Promise<boolean> {
    return false;
  }

  @logMethod()
  async executeEval(
    strToEval: string,
    runVolume: IStorageVolume
  ): Promise<IComputeExecuteResult> {
    const runPath = await runVolume.fileSystem.getRealPath(".");
    const cmd = `${this.commandPrefix} ${this.evaluationSuffix} "${strToEval}"`;

    return await exec(cmd, runPath);
  }

  @logMethod()
  async executeSource(
    sourceVolume: IStorageVolume,
    dependencies: IComputeDependency[],
    entryPoint: string,
    args?: string[] | undefined
  ): Promise<IComputeExecuteResult> {
    await this.ensureDependencies(dependencies, sourceVolume);
    const runPath = await sourceVolume.fileSystem.getRealPath(".");
    const cmd = `${this.commandPrefix}  "${entryPoint}" ${
      args != null ? args.join(" ") : ""
    }`;
    return await exec(cmd, runPath);
  }

  @logMethod()
  async ensureDependencies(
    deps: IComputeDependency[],
    runVolume: IStorageVolume
  ): Promise<void> {
    await this.ensureCommandDependencies();
    const failed: IComputeDependency[] = [];
    for (const dep of deps) {
      try {
        await this.installPackage(dep.name, runVolume);
      } catch (e) {
        this.log.error("install failed", dep.name, e);
        failed.push(dep);
      }
    }
    if (failed.length > 0) {
      throw BasicError.notFound(
        this.name,
        "dependencies failed",
        failed.map((item) => item.name).join(",")
      );
    }
  }

  protected async installPackage(
    name: string,
    runVolume: IStorageVolume
  ): Promise<number> {
    return 0;
  }
}
