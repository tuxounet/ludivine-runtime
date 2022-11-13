import fs from "fs";
import path from "path";
export async function readJSONFile<T = Record<string, string>>(
  ...pathSegments: string[]
): Promise<T> {
  const filename = path.resolve(...pathSegments);
  const body = await fs.promises.readFile(filename, { encoding: "utf-8" });
  const result: T = JSON.parse(body) as T;
  return result;
}
