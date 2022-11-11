import fs from "fs";
import path from "path";
export function readJSONFileSync<T = Record<string, string>>(
  ...pathSegments: string[]
): T {
  const filename = path.resolve(...pathSegments);
  const body = fs.readFileSync(filename, { encoding: "utf-8" });
  const result: T = JSON.parse(body) as T;
  return result;
}
