import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = join(__dirname, "..", "..", "assets", "templates");
/**
 * Milestone-1 stand-in for a real, pre-designed character sheet. In
 * production this file is produced externally (Figma/Illustrator export)
 * and just dropped here; the export code only ever draws values on top of
 * whatever template file `fieldMap.ts` points at.
 */
async function buildPlaceholderTemplate() {
    const doc = await PDFDocument.create();
    const page = doc.addPage([595.28, 841.89]); // A4
    const font = await doc.embedFont(StandardFonts.HelveticaBold);
    page.drawText("Nascent Eternity - Charakterbogen (Platzhalter)", {
        x: 72,
        y: 780,
        size: 14,
        font,
        color: rgb(0.1, 0.1, 0.1),
    });
    page.drawRectangle({
        x: 60,
        y: 580,
        width: 475,
        height: 140,
        borderColor: rgb(0.6, 0.6, 0.6),
        borderWidth: 1,
    });
    return doc.save();
}
export async function ensurePlaceholderTemplate() {
    const path = join(TEMPLATES_DIR, "placeholder-sheet.pdf");
    try {
        await readFile(path);
    }
    catch {
        await mkdir(TEMPLATES_DIR, { recursive: true });
        await writeFile(path, await buildPlaceholderTemplate());
    }
    return path;
}
