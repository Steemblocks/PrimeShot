const sharp = require("sharp");
const path = require("path");

const sizes = [16, 48, 128];

async function convertIcons() {
  for (const size of sizes) {
    const svgPath = path.join(__dirname, "icons", `icon${size}.svg`);
    const pngPath = path.join(__dirname, "icons", `icon${size}.png`);

    try {
      await sharp(svgPath).resize(size, size).png().toFile(pngPath);
      console.log(`✓ Created icon${size}.png`);
    } catch (err) {
      console.error(`✗ Failed to create icon${size}.png:`, err.message);
    }
  }
  console.log("\nDone! Icons are ready.");
}

convertIcons();
