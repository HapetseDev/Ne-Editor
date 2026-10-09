import { z } from "zod";
export declare const characterModelAssetSchema: z.ZodObject<{
    id: z.ZodString;
    characterId: z.ZodString;
    storageKey: z.ZodString;
    fileName: z.ZodString;
    isActive: z.ZodBoolean;
    createdAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: Date;
    characterId: string;
    storageKey: string;
    fileName: string;
    isActive: boolean;
}, {
    id: string;
    createdAt: Date;
    characterId: string;
    storageKey: string;
    fileName: string;
    isActive: boolean;
}>;
export type CharacterModelAsset = z.infer<typeof characterModelAssetSchema>;
