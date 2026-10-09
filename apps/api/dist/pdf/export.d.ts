import type { Character } from "@prisma/client";
export declare function exportCharacterPdf(character: Character): Promise<Uint8Array>;
