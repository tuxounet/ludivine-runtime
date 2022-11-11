import fs from "fs";
import path from "path";
export async function readTextFile(...pathSegments: string[]): Promise<string> {
  const filename = path.resolve(...pathSegments);
  return await fs.promises.readFile(filename, { encoding: "utf-8" });
}
