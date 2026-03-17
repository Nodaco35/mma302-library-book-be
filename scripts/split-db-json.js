const fs = require("fs");
const path = require("path");

const sourcePath = path.resolve(__dirname, "..", "..", "nococo", "db.json");
const outputDir = path.resolve(__dirname, "..", "seed-data");

if (!fs.existsSync(sourcePath)) {
  console.error(`db.json not found at ${sourcePath}`);
  process.exit(1);
}

const raw = fs.readFileSync(sourcePath, "utf8");
const data = JSON.parse(raw);

fs.mkdirSync(outputDir, { recursive: true });

Object.entries(data).forEach(([key, value]) => {
  const outPath = path.join(outputDir, `${key}.json`);
  fs.writeFileSync(outPath, JSON.stringify(value, null, 2), "utf8");
  console.log(`Wrote ${outPath}`);
});
