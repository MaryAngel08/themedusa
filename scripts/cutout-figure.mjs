import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "assets", "figure.png");
const outPng = path.join(root, "assets", "figure-cutout.png");

const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const out = Buffer.from(data);

for (let y = 0; y < height; y++) {
  const t = y / (height - 1);
  let fade = 1;
  if (t > 0.78) fade = 1 - (t - 0.78) / 0.22;
  if (fade < 0) fade = 0;
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels + 3;
    out[i] = Math.round(out[i] * fade);
  }
}

await sharp(out, { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .toFile(outPng);

for (const widthOut of [480, 857]) {
  for (const format of ["webp", "avif"]) {
    const dest = path.join(root, "assets", `figure-cutout-${widthOut}.${format}`);
    const pipeline = sharp(outPng).resize({ width: widthOut, withoutEnlargement: true });
    if (format === "webp") pipeline.webp({ quality: 78, effort: 5, alphaQuality: 90 });
    if (format === "avif") pipeline.avif({ quality: 48, effort: 4 });
    await pipeline.toFile(dest);
  }
}

console.log("wrote figure-cutout png/webp/avif");
