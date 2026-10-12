import { readdir, stat, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const downloadsDir = path.join(process.cwd(), "public", "downloads");
const outputFile = path.join(process.cwd(), "data", "downloads.generated.ts");

const toTitle = (filename) =>
  filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatBytes = (bytes) => {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

async function getFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.flatMap((entry) => {
      const absolutePath = path.join(directory, entry.name);
      return entry.isDirectory() ? getFiles(absolutePath) : [absolutePath];
    }),
  );
  return files.flat();
}

const files = existsSync(downloadsDir) ? await getFiles(downloadsDir) : [];
const documents = await Promise.all(
  files.map(async (filePath) => {
    const fileStats = await stat(filePath);
    const relativePath = path.relative(downloadsDir, filePath).split(path.sep).join("/");
    const fileName = path.basename(relativePath);
    const extension = path.extname(fileName).slice(1).toUpperCase() || "FILE";
    return {
      fileName,
      href: `/downloads/${relativePath.split("/").map(encodeURIComponent).join("/")}`,
      title: toTiֻǱ˞