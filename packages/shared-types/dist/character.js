import { z } from "zod";
/**
 * The actual Nascent Eternity rules (attributes, Spezies, Skills, ...) are not
 * finalized yet. Until then, the character sheet payload stays a flexible,
 * versioned bag of data instead of a hard-coded shape.
 */
export const CHARACTER_SCHEMA_VERSION = 1;
export const characterDataSchema = z.object({
    notes: z.string().default(""),
    placeholderStats: z.record(z.string(), z.union([z.string(), z.number()])).default({}),
});
export const createEmptyCharacterData = () => ({
    notes: "",
    placeholderStats: {},
});
export const characterSummarySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1),
    schemaVersion: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
});
export const characterSchema = characterSummarySchema.extend({
    data: characterDataSchema,
});
export const createCharacterInputSchema = z.object({
    name: z.string().min(1).max(200),
});
export const updateCharacterInputSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(200).optional(),
    data: characterDataSchema.optional(),
});
