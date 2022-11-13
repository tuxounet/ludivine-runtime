import fs from "fs";
import path from "path";

export async function writeJSONFile<T = Record<string, string>>(
  value: T,
  ...pathSegments: string[]
): Promise<void> {
  const filename = path.resolve(...pathSegments);
  const content = JSON.stringify(value);
  await fs.promises.writeFile(filename, content, { encoding: "utf-8" });
}
