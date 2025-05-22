import { readdir, stat, writeFile } from "fs/promises";
import { join } from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

// __dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

// Folder paths
const baseFolder = join(__dirname, "./uploads/cardsImages");
const frontFolder = join(baseFolder, "cardsFront");
const detailFolder = join(baseFolder, "cardsDetail");

async function generateCardData() {
    const frontImages = (await readdir(frontFolder)).filter(file => /\.(png|jpe?g|webp)$/i.test(file));
    const detailImages = (await readdir(detailFolder)).filter(file => /\.(png|jpe?g|webp)$/i.test(file));

    const cards = [];

    const count = Math.min(frontImages.length, detailImages.length); // Pairing limit

    for (let i = 0; i < count; i++) {
        cards.push({
            id: randomUUID(),
            image: `/uploads/cardsImages/cardsFront/${frontImages[i]}`,
            detailImage: `/uploads/cardsImages/cardsDetail/${detailImages[i]}`,
            title: `${detailImages[i].split(" ").slice(0, 2).join(" ")}`, // <-- Tum khud fill karo
            price: "$12", // <-- Tum khud fill karo
            description: "", // <-- Tum khud fill karo
            country: `${detailImages[i].split(" ")[0]}`, // <-- Tum khud fill karo
            detailedDescription: "", // <-- Tum khud fill karo
            category: `${detailImages[i].split(" ")[1]}` // <-- Tum khud fill karo
        });
    }

    // ✅ Write as a JS module
    const fileContent = `export const cards = ${JSON.stringify(cards, null, 2)};\n`;
    const outputPath = join(__dirname, "data/cardsData.js");
    await writeFile(outputPath, fileContent);

    console.log("✅ cardsData.js file generated for import.");
}

generateCardData().catch(console.error);
