import fs from "fs";
import path from "path";
export async function existsFile(...pathSegments: string[]): Promise<boolean> {
  const filename = path.resolve(...pathSegments);
  return fs.existsSync(filename);
}
