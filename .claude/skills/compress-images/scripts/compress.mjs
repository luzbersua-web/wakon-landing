#!/usr/bin/env node
// Compress image(s) to lightweight web-ready JPEGs.
//
// Single file:
//   node compress.mjs <input-file> <output-file> [quality]
//
// Batch (whole directory):
//   node compress.mjs <input-dir> <output-dir> [quality]
//
// Any transparency is flattened onto white (JPEG has no alpha channel).
// Batch mode processes every .png/.jpg/.jpeg/.webp file in the input dir
// and writes a same-basename .jpg into the output dir.

import sharp from "sharp";
import fs from "fs";
import path from "path";

const [, , inputArg, outputArg, qualityArg] = process.argv;
const quality = qualityArg ? parseInt(qualityArg, 10) : 82;

if (!inputArg || !outputArg) {
  console.error("Usage: node compress.mjs <input-file-or-dir> <output-file-or-dir> [quality=82]");
  process.exit(1);
}

const IMAGE_EXT = /\.(png|jpe?g|webp|avif|tiff?)$/i;

async function compressOne(inputPath, outputPath) {
  const before = fs.statSync(inputPath).size;
  const tmp = outputPath + ".tmp";
  await sharp(inputPath)
    .flatten({ background: "#ffffff" })
    .jpeg({ quality, mozjpeg: true })
    .toFile(tmp);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.renameSync(tmp, outputPath);
  const after = fs.statSync(outputPath).size;
  return { before, after };
}

async function main() {
  const inputIsDir = fs.statSync(inputArg).isDirectory();
  const rows = [];

  if (inputIsDir) {
    fs.mkdirSync(outputArg, { recursive: true });
    const files = fs.readdirSync(inputArg).filter((f) => IMAGE_EXT.test(f));
    if (files.length === 0) {
      console.error(`No image files found in ${inputArg}`);
      process.exit(1);
    }
    for (const f of files) {
      const destName = f.replace(IMAGE_EXT, ".jpg");
      const { before, after } = await compressOne(path.join(inputArg, f), path.join(outputArg, destName));
      rows.push([destName, before, after]);
    }
  } else {
    const destName = path.basename(outputArg);
    const { before, after } = await compressOne(inputArg, outputArg);
    rows.push([destName, before, after]);
  }

  const nameWidth = Math.max(...rows.map((r) => r[0].length), 12);
  let totalBefore = 0, totalAfter = 0;
  console.log(`\n${"file".padEnd(nameWidth)}  before      after      saved`);
  for (const [name, before, after] of rows) {
    totalBefore += before;
    totalAfter += after;
    const pct = (100 * (1 - after / before)).toFixed(0);
    console.log(`${name.padEnd(nameWidth)}  ${(before / 1024).toFixed(0).padStart(7)}KB  ${(after / 1024).toFixed(0).padStart(7)}KB   -${pct}%`);
  }
  if (rows.length > 1) {
    const pct = (100 * (1 - totalAfter / totalBefore)).toFixed(0);
    console.log(`${"TOTAL".padEnd(nameWidth)}  ${(totalBefore / 1024).toFixed(0).padStart(7)}KB  ${(totalAfter / 1024).toFixed(0).padStart(7)}KB   -${pct}%`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
