import { PDFDocument, StandardFonts } from "pdf-lib";
import { readFile } from "node:fs/promises";
import { placeholderFieldMap } from "./fieldMap.js";
import { ensurePlaceholderTemplate } from "./template.js";
function getByPath(obj, path) {
    return path.split(".").reduce((value, key) => {
        if (value && typeof value === "object" && key in value) {
            return value[key];
        }
        return undefined;
    }, obj);
}
export async function exportCharacterPdf(character) {
    const templatePath = await ensurePlaceholderTemplate();
    const templateBytes = await readFile(templatePath);
    const doc = await PDFDocument.load(templateBytes);
    const font = await doc.embedFont(StandardFonts.Helvetica);
    for (const field of placeholderFieldMap.fields) {
        const page = doc.getPage(field.page);
        const value = getByPath(character, field.key);
        if (value === undefined || value === null)
            continue;
        page.drawText(String(value), {
            x: field.x,
            y: field.y,
            size: field.size,
            font,
        });
    }
    return doc.save();
}
