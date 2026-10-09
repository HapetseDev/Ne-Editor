import { z } from "zod";

/**
 * One field placed on top of a pre-designed template PDF. `key` is a dot-path
 * into the character payload (e.g. "data.notes"); the exporter looks it up
 * and draws the value at (x, y) on the given page. This keeps the visual
 * design entirely in whatever tool produced the template PDF — adding or
 * moving a field is a config change, not a code change.
 */
export const pdfFieldSchema = z.object({
  key: z.string(),
  page: z.number().int().min(0),
  x: z.number(),
  y: z.number(),
  size: z.number().default(11),
});

export const pdfTemplateSchema = z.object({
  id: z.string(),
  templateFile: z.string(),
  fields: z.array(pdfFieldSchema),
});

export type PdfField = z.infer<typeof pdfFieldSchema>;
export type PdfTemplate = z.infer<typeof pdfTemplateSchema>;
