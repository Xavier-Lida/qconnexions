import { isCalendarDateBeforeTodayMontreal } from "@/lib/dates/montreal";

import type { PuzzlePayloadParsed } from "@/lib/puzzles/payload-schema";

export type DailyPuzzleRow = {
  id: string;
  play_date: string;
  payload: PuzzlePayloadParsed;
};

export type AdminPuzzleListItem =
  | {
      access: "readonly";
      id: string;
      playDate: string;
      themeLabels: readonly string[];
    }
  | {
      access: "editable";
      id: string;
      playDate: string;
      themeLabels: readonly string[];
      payload: PuzzlePayloadParsed;
    };

export function toAdminPuzzleListItem(row: DailyPuzzleRow, todayMontreal: string): AdminPuzzleListItem {
  const themeLabels = row.payload.map((c) => c.label) as readonly string[];
  const common = { id: row.id, playDate: row.play_date, themeLabels };

  if (isCalendarDateBeforeTodayMontreal(row.play_date, todayMontreal)) {
    return { access: "readonly", ...common };
  }

  return { access: "editable", ...common, payload: row.payload };
}
