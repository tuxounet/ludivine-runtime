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
  IComputeProjectCode,
  IComputeRuntime,
  IComputeSourceCode,
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
    source: IComputeSourceCode
  ): Promise<IComputeExecuteResult> {
    await this.createNewRunDir();
    await this.ensureDependencies(source.dependencies);
    const fileName = source.name + "." + source.extension;
    await this.writeSourceFile(fileName, source.body);

    const rc = await this.executeSystemCommand(
      `${this.commandPrefix} ./${fileName} ${
        source.args != null ? source.args.join(" ") : " "
      }`
    );

    const logs = await this.extractRunLog();

    await this.cleanupRunDir();

    return {
      rc,
      output: logs,
      errors: "",
    };
  }

  async executeProject(
    project: IComputeProjectCode
  ): Promise<IComputeExecuteResult> {
    await this.createNewRunDir();
    if (this.runDirectory === undefined)
      throw BasicError.notFound(
        this.fullName,
        "executeProject",
        "runDirectory"
      );

    const projectVolume = await this.kernel.storage.createEphemeralVolume(
      "local",
      "local",
      { folder: project.path },
      this
    );
    const runVolume = await this.kernel.storage.getVolume("runspace");

    const entries = await projectVolume.fileSystem.list(".");

    await Promise.all(
      entries.map(async (item) => {
        const body = await projectVolume.fileSystem.readFile(item.path);
        if (body.body == null) return;
        if (this.runDirectory == null) return;
        await runVolume.fileSystem.writeFile(
          runVolume.paths.combinePaths(this.runDirectory, item.path),
          body.body
        );
      })
    );
    await this.ensureDependencies(project.dependencies);

    const rc = await this.executeSystemCommand(
      `${this.commandPrefix} ./${project.entryPoint} ${
        project.args != null ? project.args.join(" ") : " "
      }`
    );

    const logs = await this.extractRunLog();

    await this.cleanupRunDir();

    return {
      rc,
      output: logs,
      errors: "",
    };
  }

  abstract ensureDependencies(deps: IComputeDependency[]): Promise<void>;

  protected async createNewRunDir(): Promise<void> {
    const volume = await this.kernel.storage.getVolume("runspace");
    this.runDirectory = await volume.fileSystem.createTempDirectory();
  }

  protected async cleanupRunDir(): Promise<void> {
    if (this.runDirectory === undefined) return;
    const volume = await this.kernel.storage.getVolume("runspace");

    const files = await volume.fileSystem.list(this.runDirectory);
    await Promise.all(
      files.map(async (item) => await volume.fileSystem.deleteFile(item.path))
    );

    await volume.fileSystem.deleteDirectory(this.runDirectory);
  }

  protected async extractRunLog(): Promise<string> {
    if (this.runDirectory === undefined) return "no logs";
    const volume = await this.kernel.storage.getVolume("runspace");
    const logFile = volume.paths.combinePaths(this.runDirectory, "output.log");
    const logs = await volume.fileSystem.readTextFile(logFile);
    if (logs.body === undefined) {
      return "no logs";
    }
    return logs.body;
  }

  protected async writeSourceFile(
    fileName: string,
    body: string
  ): Promise<boolean> {
    if (this.runDirectory === undefined)
      throw BasicError.notFound(
        this.fullName,
        "writeSourceFile",
        "runDirectory"
      );
    const volume = await this.kernel.storage.getVolume("runspace");
    const targetFilePath = volume.paths.combinePaths(
      this.runDirectory,
      fileName
    );

    return await volume.fileSystem.writeTextFile(targetFilePath, body);
  }

  protected async executeSystemCommand(cmd: string): Promise<number> {
    if (this.runDirectory === undefined) {
      throw BasicError.notFound(
        this.fullName,
        "executeSystemCommand",
        "runDirectory"
      );
    }
    const volume = await this.kernel.storage.getVolume("runspace");
    let realRunDirectory = await volume.fileSystem.getRealPath(
      this.runDirectory
    );
    realRunDirectory += volume.paths.sep;
    const command = `${cmd} >> "${realRunDirectory}output.log"`;
    this.log.debug("executing", command, "inside", realRunDirectory);
    try {
      childProc.execSync(command, {
        cwd: realRunDirectory,
        shell: "bash",
      });
      this.log.debug("executed", command, "inside", realRunDirectory);
      return 0;
    } catch (error) {
      this.log.error("failed", command, "inside", realRunDirectory);

      const targetFilePath = volume.paths.combinePaths(
        this.runDirectory,
        "output.log"
      );
      await volume.fileSystem.writeTextFile(
        targetFilePath,
        "FATAL :" + String(error)
      );

      return 1;
    }
  }
}
