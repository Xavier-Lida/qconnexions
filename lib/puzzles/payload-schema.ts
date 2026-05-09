import { z } from "zod";

import type { DemoPuzzle, GroupColor, PuzzleCategory } from "@/lib/puzzles/demo";

const groupColorSchema = z.enum(["navy", "sky", "white", "gold"] satisfies readonly GroupColor[]);

const wordSchema = z
  .string()
  .trim()
  .min(1, "Mot requis")
  .transform((s) => s.toUpperCase());

const puzzleCategorySchema = z.object({
  label: z.string().trim().min(1, "Libellé requis"),
  color: groupColorSchema,
  words: z.tuple([wordSchema, wordSchema, wordSchema, wordSchema]),
});

export const puzzlePayloadSchema = z.tuple([
  puzzleCategorySchema,
  puzzleCategorySchema,
  puzzleCategorySchema,
  puzzleCategorySchema,
]);

export type PuzzlePayloadInput = z.input<typeof puzzlePayloadSchema>;
export type PuzzlePayloadParsed = z.output<typeof puzzlePayloadSchema>;

export function parsePuzzlePayload(
  raw: unknown
): { ok: true; data: PuzzlePayloadParsed } | { ok: false; message: string } {
  const r = puzzlePayloadSchema.safeParse(raw);
  if (!r.success) {
    const first = r.error.issues[0]?.message ?? "Données invalides";
    return { ok: false, message: first };
  }
  return { ok: true, data: r.data };
}

export function payloadToJson(categories: readonly PuzzleCategory[]): PuzzlePayloadParsed {
  return categories.map((c) => ({
    label: c.label,
    color: c.color,
    words: [...c.words] as [string, string, string, string],
  })) as PuzzlePayloadParsed;
}

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export function parsePlayDateString(s: string): { ok: true; value: string } | { ok: false } {
  const t = s.trim();
  if (!isoDateRegex.test(t)) {
    return { ok: false };
  }
  const d = new Date(`${t}T12:00:00`);
  if (Number.isNaN(d.getTime())) {
    return { ok: false };
  }
  return { ok: true, value: t };
}

export function puzzlePayloadToDemoPuzzle(rowId: string, payload: PuzzlePayloadParsed): DemoPuzzle {
  return {
    id: rowId,
    categories: payload as unknown as readonly PuzzleCategory[],
  };
}
