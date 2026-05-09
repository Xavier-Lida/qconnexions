"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DEMO_PUZZLE,
  flattenWords,
  type GroupColor,
  type PuzzleCategory,
  sameSet,
  shuffleWords,
  shuffleWordsSeeded,
} from "@/lib/puzzles/demo";
import { cn } from "@/lib/utils";

const GROUP_ROW_CLASS: Record<GroupColor, string> = {
  navy: "bg-group-navy text-group-navy-fg",
  sky: "bg-group-sky text-group-sky-fg",
  white: "bg-group-white text-group-white-fg ring-1 ring-border",
  gold: "bg-group-gold text-group-gold-fg",
};

/** Même hauteur minimale que les tuiles du puzzle. */
const TILE_BOX_MIN =
  "min-h-[4.25rem] sm:min-h-[5rem]";

type SubmitPhase = "idle" | "bouncing" | "shaking";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function isOneAway(selected: string[], remaining: readonly PuzzleCategory[]): boolean {
  return remaining.some((cat) => {
    const hit = selected.filter((w) =>
      cat.words.some((cw) => cw.toUpperCase() === w.toUpperCase())
    ).length;
    return hit === 3;
  });
}

const DEMO_SEED = 2026_05_09;
/** Rebond en cascade selon l’ordre de sélection (`.cq-tile-bounce` 0.36s par tuile). */
const BOUNCE_CASCADE_MS = 72;
const BOUNCE_TOTAL_MS = BOUNCE_CASCADE_MS * 3 + 360;
const SHAKE_TOTAL_MS = 520;

export function PuzzleGame() {
  const [gridOrder, setGridOrder] = useState<string[]>(() =>
    shuffleWordsSeeded(flattenWords(DEMO_PUZZLE), DEMO_SEED)
  );
  const [solved, setSolved] = useState<PuzzleCategory[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [mistakesLeft, setMistakesLeft] = useState(4);
  const [submitPhase, setSubmitPhase] = useState<SubmitPhase>("idle");
  const [solvedRevealLabel, setSolvedRevealLabel] = useState<string | null>(null);

  const remainingCategories = useMemo(() => {
    const solvedLabels = new Set(solved.map((c) => c.label));
    return DEMO_PUZZLE.categories.filter((c) => !solvedLabels.has(c.label));
  }, [solved]);

  const won = solved.length === DEMO_PUZZLE.categories.length;
  const lost = mistakesLeft <= 0 && !won;
  const busy = submitPhase !== "idle";
  const frozen = won || lost || busy;

  const toggleWord = useCallback(
    (word: string) => {
      if (frozen) return;
      setSelected((prev) => {
        const i = prev.indexOf(word);
        if (i >= 0) return prev.filter((w) => w !== word);
        if (prev.length >= 4) return prev;
        return [...prev, word];
      });
    },
    [frozen]
  );

  const deselectAll = useCallback(() => {
    if (busy) return;
    setSelected([]);
  }, [busy]);

  const shuffleGrid = useCallback(() => {
    if (frozen) return;
    setGridOrder((prev) => shuffleWords(prev));
  }, [frozen]);

  useEffect(() => {
    if (!solvedRevealLabel) return;
    const t = window.setTimeout(() => setSolvedRevealLabel(null), 600);
    return () => window.clearTimeout(t);
  }, [solvedRevealLabel]);

  const runSubmit = useCallback(async () => {
    if (won || lost || busy || selected.length !== 4) return;

    const sel = [...selected];
    const match = remainingCategories.find((cat) => sameSet(sel, cat.words));

    setSubmitPhase("bouncing");
    await delay(BOUNCE_TOTAL_MS);

    if (match) {
      const nextSolved = [...solved, match];
      setSolved(nextSolved);
      setSolvedRevealLabel(match.label);
      setSelected([]);
      setGridOrder((words) => words.filter((w) => !match.words.includes(w)));
      setSubmitPhase("idle");
      return;
    }

    setSubmitPhase("shaking");
    await delay(SHAKE_TOTAL_MS);

    const nextMistakes = mistakesLeft - 1;
    setMistakesLeft(nextMistakes);
    setSelected([]);
    setSubmitPhase("idle");

    if (isOneAway(sel, remainingCategories)) {
      toast.message("À un mot près — trois mots sur quatre vont ensemble.");
    }
  }, [won, lost, busy, selected, remainingCategories, solved, mistakesLeft]);

  return (
    <Card
      size="sm"
      className="flex h-full min-h-0 w-full flex-col overflow-visible border-border shadow-sm ring-1 ring-border/60"
    >
      <CardHeader className="shrink-0 gap-1">
        <CardTitle className="font-heading text-lg tracking-tight text-foreground sm:text-xl">
          Formez quatre groupes de quatre !
        </CardTitle>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-2 overflow-visible">
        <div className="flex min-h-[min(52vh,28rem)] flex-1 flex-col justify-center gap-3">
          {solved.map((cat) => (
            <div
              key={cat.label}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-2xl px-3 text-center text-base font-extrabold uppercase leading-tight tracking-tight sm:px-4",
                TILE_BOX_MIN,
                GROUP_ROW_CLASS[cat.color],
                cat.label === solvedRevealLabel && "cq-solved-reveal"
              )}
            >
              <p className="max-w-full text-[0.65rem] font-bold uppercase leading-snug opacity-90 sm:text-xs">
                {cat.label}
              </p>
              <p className="text-balance font-extrabold">{cat.words.join(" · ")}</p>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gridOrder.map((word) => {
              const isOn = selected.includes(word);
              const showBounce = submitPhase === "bouncing" && isOn;
              const showShake = submitPhase === "shaking" && isOn;
              const cascadeIndex = selected.indexOf(word);
              return (
                <Button
                  key={word}
                  type="button"
                  variant="outline"
                  size="lg"
                  aria-pressed={isOn}
                  disabled={frozen}
                  onClick={() => toggleWord(word)}
                  style={
                    showBounce && cascadeIndex >= 0
                      ? { animationDelay: `${cascadeIndex * BOUNCE_CASCADE_MS}ms` }
                      : undefined
                  }
                  className={cn(
                    "h-auto whitespace-normal px-2 py-4 text-center text-base font-extrabold uppercase leading-tight tracking-tight transition-colors duration-200 ease-out sm:text-lg",
                    TILE_BOX_MIN,
                    isOn &&
                      "border-border bg-prussian text-background hover:border-border hover:bg-prussian hover:text-background active:border-border active:bg-prussian",
                    showBounce && "cq-tile-bounce",
                    showShake && "cq-tile-shake"
                  )}
                >
                  {word}
                </Button>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Erreurs restantes :{" "}
              <span className="inline-flex gap-1.5 align-middle">
                {Array.from({ length: 4 }, (_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "inline-block size-2.5 rounded-full bg-foreground/70",
                      i >= mistakesLeft && "bg-muted-foreground/25"
                    )}
                    aria-hidden
                  />
                ))}
              </span>
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="shrink-0 flex-wrap gap-2 border-t border-border pt-4">
        <Button type="button" variant="outline" onClick={shuffleGrid} disabled={frozen}>
          Mélanger
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={deselectAll}
          disabled={frozen || selected.length === 0}
        >
          Tout désélectionner
        </Button>
        <Button
          type="button"
          onClick={() => void runSubmit()}
          disabled={frozen || selected.length !== 4}
          className="sm:ml-auto"
        >
          Soumettre
        </Button>
      </CardFooter>
    </Card>
  );
}
