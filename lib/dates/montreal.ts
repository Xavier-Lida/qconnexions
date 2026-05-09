/** Fuseau calendaire aligné sur la home (`America/Montreal`). */
export const PUZZLE_TIME_ZONE = "America/Montreal";

const isoDateInZone = new Intl.DateTimeFormat("en-CA", {
  timeZone: PUZZLE_TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/**
 * Date civile `YYYY-MM-DD` à Montréal pour un instant donné (par défaut maintenant).
 */
export function calendarDateStringInMontreal(at: Date = new Date()): string {
  const parts = isoDateInZone.formatToParts(at);
  const y = parts.find((p) => p.type === "year")?.value;
  const m = parts.find((p) => p.type === "month")?.value;
  const d = parts.find((p) => p.type === "day")?.value;
  if (!y || !m || !d) {
    throw new Error("calendarDateStringInMontreal: missing date parts");
  }
  return `${y}-${m}-${d}`;
}

/** Comparaison lexicographique suffit pour des chaînes ISO `YYYY-MM-DD`. */
export function calendarDateCompare(a: string, b: string): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

export function isCalendarDateOnOrAfterTodayMontreal(playDate: string, today: string): boolean {
  return calendarDateCompare(playDate, today) >= 0;
}

export function isCalendarDateBeforeTodayMontreal(playDate: string, today: string): boolean {
  return calendarDateCompare(playDate, today) < 0;
}

/** Entier déterministe pour le mélange initial (ex. `2026-05-09` → `20260509`). */
export function shuffleSeedFromCalendarDate(iso: string): number {
  const [y, m, d] = iso.split("-").map((p) => Number.parseInt(p, 10));
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) {
    throw new Error(`shuffleSeedFromCalendarDate: invalid iso ${iso}`);
  }
  return y * 10_000 + m * 100 + d;
}
