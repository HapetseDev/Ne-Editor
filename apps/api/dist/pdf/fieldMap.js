/**
 * Hand-authored coordinates for the placeholder template (see template.ts).
 * Swapping in a real, designed character-sheet PDF later means replacing
 * `templateFile` + re-measuring these coordinates — no export-code changes.
 */
export const placeholderFieldMap = {
    id: "placeholder-v1",
    templateFile: "placeholder-sheet.pdf",
    fields: [
        { key: "name", page: 0, x: 150, y: 700, size: 16 },
        { key: "data.notes", page: 0, x: 72, y: 600, size: 11 },
    ],
};
