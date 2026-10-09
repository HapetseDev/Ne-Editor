import { z } from "zod";
/**
 * The actual Nascent Eternity rules (attributes, Spezies, Skills, ...) are not
 * finalized yet. Until then, the character sheet payload stays a flexible,
 * versioned bag of data instead of a hard-coded shape.
 */
export declare const CHARACTER_SCHEMA_VERSION = 1;
export declare const characterDataSchema: z.ZodObject<{
    notes: z.ZodDefault<z.ZodString>;
    placeholderStats: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
}, "strip", z.ZodTypeAny, {
    notes: string;
    placeholderStats: Record<string, string | number>;
}, {
    notes?: string | undefined;
    placeholderStats?: Record<string, string | number> | undefined;
}>;
export type CharacterData = z.infer<typeof characterDataSchema>;
export declare const createEmptyCharacterData: () => CharacterData;
export declare const characterSummarySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    schemaVersion: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    schemaVersion: number;
    createdAt: Date;
    updatedAt: Date;
}, {
    id: string;
    name: string;
    schemaVersion: number;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const characterSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    schemaVersion: z.ZodNumber;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
} & {
    data: z.ZodObject<{
        notes: z.ZodDefault<z.ZodString>;
        placeholderStats: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    }, "strip", z.ZodTypeAny, {
        notes: string;
        placeholderStats: Record<string, string | number>;
    }, {
        notes?: string | undefined;
        placeholderStats?: Record<string, string | number> | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    schemaVersion: number;
    createdAt: Date;
    updatedAt: Date;
    data: {
        notes: string;
        placeholderStats: Record<string, string | number>;
    };
}, {
    id: string;
    name: string;
    schemaVersion: number;
    createdAt: Date;
    updatedAt: Date;
    data: {
        notes?: string | undefined;
        placeholderStats?: Record<string, string | number> | undefined;
    };
}>;
export type CharacterSummary = z.infer<typeof characterSummarySchema>;
export type Character = z.infer<typeof characterSchema>;
export declare const createCharacterInputSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export declare const updateCharacterInputSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    data: z.ZodOptional<z.ZodObject<{
        notes: z.ZodDefault<z.ZodString>;
        placeholderStats: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber]>>>;
    }, "strip", z.ZodTypeAny, {
        notes: string;
        placeholderStats: Record<string, string | number>;
    }, {
        notes?: string | undefined;
        placeholderStats?: Record<string, string | number> | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name?: string | undefined;
    data?: {
        notes: string;
        placeholderStats: Record<string, string | number>;
    } | undefined;
}, {
    id: string;
    name?: string | undefined;
    data?: {
        notes?: string | undefined;
        placeholderStats?: Record<string, string | number> | undefined;
    } | undefined;
}>;
