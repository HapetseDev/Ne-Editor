import { z } from "zod";
export const characterModelAssetSchema = z.object({
    id: z.string().uuid(),
    characterId: z.string().uuid(),
    storageKey: z.string(),
    fileName: z.string(),
    isActive: z.boolean(),
    createdAt: z.date(),
});
