import "server-only";

import { calendarDateStringInMontreal, shuffleSeedFromCalendarDate } from "@/lib/dates/montreal";
import { DEMO_PUZZLE, type DemoPuzzle } from "@/lib/puzzles/demo";
import {
  parsePuzzlePayload,
  puzzlePayloadToDemoPuzzle,
} from "@/lib/puzzles/payload-schema";
import { createServiceRoleClientOrNull } from "@/lib/supabase/service-role";

export type DailyPuzzleFallbackReason =
  | "no_service_key"
  | "not_found"
  | "invalid_payload"
  | "db_error";

export type DailyPuzzleHomeResult =
  | {
      source: "database";
      puzzle: DemoPuzzle;
      playDateIso: string;
      shuffleSeed: number;
    }
  | {
      source: "fallback";
      puzzle: DemoPuzzle;
      playDateIso: string;
      shuffleSeed: number;
      reason: DailyPuzzleFallbackReason;
    };

function buildFallback(
  playDateIso: string,
  shuffleSeed: number,
  reason: DailyPuzzleFallbackReason
): DailyPuzzleHomeResult {
  return {
    source: "fallback",
    puzzle: DEMO_PUZZLE,
    playDateIso,
    shuffleSeed,
    reason,
  };
}

export async function getDailyPuzzleForHome(): Promise<DailyPuzzleHomeResult> {
  const playDateIso = calendarDateStringInMontreal();
  const shuffleSeed = shuffleSeedFromCalendarDate(playDateIso);

  const sr = createServiceRoleClientOrNull();
  if (!sr) {
    return buildFallback(playDateIso, shuffleSeed, "no_service_key");
  }

  const { data, error } = await sr
    .from("daily_puzzles")
    .select("id, payload")
    .eq("play_date", playDateIso)
    .maybeSingle();

  if (error) {
    return buildFallback(playDateIso, shuffleSeed, "db_error");
  }

  if (!data) {
    return buildFallback(playDateIso, shuffleSeed, "not_found");
  }

  const parsed = parsePuzzlePayload(data.payload);
  if (!parsed.ok) {
    return buildFallback(playDateIso, shuffleSeed, "invalid_payload");
  }

  return {
    source: "database",
    puzzle: puzzlePayloadToDemoPuzzle(data.id, parsed.data),
    playDateIso,
    shuffleSeed,
  };
}
