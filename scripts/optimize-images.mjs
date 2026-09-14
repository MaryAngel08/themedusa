import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");

const jobs = [
  { src: "assets/bg.jpg", widths: [1280, 1920, 2560], webp: 72, avif: 42 },
  { src: "assets/figure.png", widths: [480, 857], webp: 78, avif: 48 },
  { src: "assets/about-medusa.jpg", widths: [80, 400, 764], webp: 78, avif: 48 },
  { src: "assets/project-caffebrasilia.jpg", widths: [240, 480], webp: 76, avif: 46 },
  { src: "assets/project-blake.png", widths: [240, 480], webp: 76, avif: 46 },
  { src: "assets/project-embervine.png", widths: [240, 480], webp: 76, avif: 46 },
  { src: "assets/services-bg.jpg", widths: [1024, 1600], webp: 72, avif: 42 },
  { src: "assets/contact-bg.jpg", widths: [1024, 1600], webp: 72, avif: 42 },
  { src: "assets/pulse-wave.png", widths: [669], webp: 82, avif: 50 },
  { src: "images/work/caffe-brasilia.jpg", widths: [640, 1024], webp: 76, avif: 46 },
  { src: "images/work/blake.png", widths: [640, 1024], webp: 76, avif: 46 },
  { src: "images/work/ctrlaltdesigner.png", widths: [640, 960, 1280], webp: 74, avif: 44 },
  { src: "images/work/ember-and-vine.png", widths: [640, 1024], webp: 76, avif: 46 },
  { src: "images/work/caffe-brasilia-2.png", widths: [800, 1440], webp: 74, avif: 44 },
  { src: "images/work/caffe-brasilia-3.png", widths: [800, 1440], webp: 74, avif: 44 },
  { src: "images/work/caffe-brasilia-4.png", widths: [800, 1440], webp: 74, avif: 44 },
  { src: "images/work/caffe-brasilia-5.png", widths: [800, 1440], webp: 74, avif: 44 },
  { src: "images/work/blake-2.png", widths: [800, 1440], webp: 74, avif: 44 },
  { src: "images/work/blake-3.png", widths: [800, 1440], webp: 74, avif: 44 },
  { src: "images/work/blake-4.png", widths: [800, 1440], webp: 74, avif: 44 },
  { src: "images/work/blake-5.png", widths: [800, 1440], webp: 74, avif: 44 },
  { src: "images/work/ctrlaltdesigner-2.png", widths: [800, 1440], webp: 74, avif: 44 },
  { src: "images/work/ctrlaltdesigner-3.png", widths: [800, 1440], webp: 74, avif: 44 },
  { src: "images/work/ctrlaltdesigner-4.png", widths: [800, 1440], webp: 74, avif: 44 },
  { src: "images/work/ctrlaltdesigner-5.png", widths: [800, 1440], webp: 74, avif: 44 },
];

async function writeVariant(input, width, outPath, format, quality) {
  const pipeline = sharp(input).resize({ width, withoutEnlargement: true });
  if (format === "webp") pipeline.webp({ quality, effort: 5 });
  if (format === "avif") pipeline.avif({ quality, effort: 4 });
  await pipeline.toFile(outPath);
}

for (const job of jobs) {
  const abs = path.join(root, job.src);
  const meta = await sharp(abs).metadata();
  const dir = path.dirname(abs);
  const name = path.parse(abs).name;
  for (const width of job.widths) {
    if (width > meta.width + 8) continue;
    for (const format of ["webp", "avif"]) {
      const out = path.join(dir, `${name}-${width}.${format}`);
      const quality = format === "webp" ? job.webp : job.avif;
      await writeVariant(abs, width, out, format, quality);
      const size = fs.statSync(out).size;
      console.log(`${path.relative(root, out)}  ${size}  (${width}w)`);
    }
  }
}
