import { z } from "zod";
/**
 * One field placed on top of a pre-designed template PDF. `key` is a dot-path
 * into the character payload (e.g. "data.notes"); the exporter looks it up
 * and draws the value at (x, y) on the given page. This keeps the visual
 * design entirely in whatever tool produced the template PDF — adding or
 * moving a field is a config change, not a code change.
 */
export declare const pdfFieldSchema: z.ZodObject<{
    key: z.ZodString;
    page: z.ZodNumber;
    x: z.ZodNumber;
    y: z.ZodNumber;
    size: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    key: string;
    page: number;
    x: number;
    y: number;
    size: number;
}, {
    key: string;
    page: number;
    x: number;
    y: number;
    size?: number | undefined;
}>;
export declare const pdfTemplateSchema: z.ZodObject<{
    id: z.ZodString;
    templateFile: z.ZodString;
    fields: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        page: z.ZodNumber;
        x: z.ZodNumber;
        y: z.ZodNumber;
        size: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        page: number;
        x: number;
        y: number;
        size: number;
    }, {
        key: string;
        page: number;
        x: number;
        y: number;
        size?: number | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    templateFile: string;
    fields: {
        key: string;
        page: number;
        x: number;
        y: number;
        size: number;
    }[];
}, {
    id: string;
    templateFile: string;
    fields: {
        key: string;
        page: number;
        x: number;
        y: number;
        size?: number | undefined;
    }[];
}>;
export type PdfField = z.infer<typeof pdfFieldSchema>;
export type PdfTemplate = z.infer<typeof pdfTemplateSchema>;
