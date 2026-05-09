export type GroupColor = "navy" | "sky" | "white" | "gold";

export type PuzzleCategory = {
  label: string;
  color: GroupColor;
  words: readonly [string, string, string, string];
};

export type DemoPuzzle = {
  id: string;
  categories: readonly PuzzleCategory[];
};

/** Puzzle démo — 16 mots, 4 thèmes (données locales, pas Supabase). */
export const DEMO_PUZZLE: DemoPuzzle = {
  id: "demo-quebec-1",
  categories: [
    {
      label: "Positions au hockey",
      color: "gold",
      words: ["GARDIEN", "DÉFENSEUR", "ATTAQUANT", "CENTRE"],
    },
    {
      label: "Grandes villes du Québec",
      color: "sky",
      words: ["MONTRÉAL", "QUÉBEC", "GATINEAU", "SHERBROOKE"],
    },
    {
      label: "Plats traditionnels",
      color: "white",
      words: ["TOURTIÈRE", "POUTINE", "FÈVES", "CRETONS"],
    },
    {
      label: "Cabane à sucre",
      color: "navy",
      words: ["CABANE", "SUCRE", "TIRE", "ÉRABLIÈRE"],
    },
  ],
} as const;

export function flattenWords(puzzle: DemoPuzzle): string[] {
  return puzzle.categories.flatMap((c) => [...c.words]);
}

/** Générateur pseudo-aléatoire déterministe (même résultat SSR / client). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a += 0x6d2b79f5;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Mélange Fisher–Yates (copie). */
export function shuffleWords(words: readonly string[], rng: () => number = Math.random): string[] {
  const copy = [...words];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const t = copy[i]!;
    copy[i] = copy[j]!;
    copy[j] = t;
  }
  return copy;
}

export function shuffleWordsSeeded(words: readonly string[], seed: number): string[] {
  return shuffleWords(words, mulberry32(seed));
}

export function normalizeWord(w: string): string {
  return w.trim().toUpperCase();
}

export function sameSet(a: readonly string[], b: readonly string[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a].map(normalizeWord).sort();
  const sb = [...b].map(normalizeWord).sort();
  return sa.every((v, i) => v === sb[i]);
}
