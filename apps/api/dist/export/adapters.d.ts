import type { Character } from "@prisma/client";
import type { CharacterData } from "@ne/shared-types";
/**
 * Export targets beyond the PDF character sheet. `necota` is a stub: the
 * NECOTA2D (Godot) save schema is still being reorganized there, so for now
 * this just hands back the raw character payload. Once that schema
 * stabilizes, replace the body of `necota.export` with a real mapping —
 * nothing else in the app needs to change.
 */
export declare const exportAdapters: {
    necota: {
        export(character: Character): {
            id: string;
            name: string;
            schemaVersion: number;
            data: CharacterData;
        };
    };
};
