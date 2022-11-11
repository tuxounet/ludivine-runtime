import fs from "fs";
import path from "path";
export function readTextFileSync(...pathSegments: string[]): string {
  const filename = path.resolve(...pathSegments);
  return fs.readFileSync(filename, { encoding: "utf-8" });
}
