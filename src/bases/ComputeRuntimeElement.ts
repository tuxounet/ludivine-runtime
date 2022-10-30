import { KernelElement } from "./KernelElement";
import commandExists from "command-exists";
import childProc from "child_process";
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

  async provision(): Promise<boolean> {
    return true;
  }

  async unprovision(): Promise<boolean> {
    return false;
  }

  async executeEval(
    strToEval: string,
    runVolume: IStorageVolume
  ): Promise<IComputeExecuteResult> {
    const runPath = await runVolume.fileSystem.getRealPath(".");
    const cmd = `${this.commandPrefix} ${this.evaluationSuffix} "${strToEval}"`;
    return await new Promise((resolve, reject) => {
      const proc = childProc.exec(
        cmd,
        {
          cwd: runPath,
        },
        (err, stdout, stderr) => {
          if (err != null) {
            return reject(err);
          }
          const result: IComputeExecuteResult = {
            rc: proc.exitCode ?? 0,
            output: stdout,
            errors: stderr,
          };
          resolve(result);
        }
      );
    });
  }

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
    return await new Promise((resolve, reject) => {
      const proc = childProc.exec(
        cmd,
        {
          cwd: runPath,
        },
        (err, stdout, stderr) => {
          if (err != null) {
            return reject(err);
          }
          const result: IComputeExecuteResult = {
            rc: proc.exitCode ?? 0,
            output: stdout,
            errors: stderr,
          };
          resolve(result);
        }
      );
    });
  }

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
