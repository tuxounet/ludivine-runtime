import childProc from "child_process";
import { IComputeExecuteResult } from "../../compute";

export async function exec(
  cmd: string,
  cwd: string
): Promise<IComputeExecuteResult> {
  return await new Promise((resolve, reject) => {
    const proc = childProc.exec(
      cmd,
      {
        cwd,
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
