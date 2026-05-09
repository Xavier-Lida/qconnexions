"use server";

import { revalidatePath } from "next/cache";

import { isAdminEmail } from "@/lib/admin";
import { calendarDateStringInMontreal, isCalendarDateBeforeTodayMontreal } from "@/lib/dates/montreal";
import { parsePlayDateString, parsePuzzlePayload } from "@/lib/puzzles/payload-schema";
import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

export type PuzzleActionResult = { ok: true } | { ok: false; message: string };

async function getAdminEmailOrNull(): Promise<string | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const email = user?.email;
  if (!email || !isAdminEmail(email)) {
    return null;
  }
  return email;
}

function duplicateDateMessage(): string {
  return "Un puzzle existe déjà pour cette date.";
}

export async function createDailyPuzzle(
  playDateRaw: string,
  payloadRaw: unknown
): Promise<PuzzleActionResult> {
  const adminEmail = await getAdminEmailOrNull();
  if (!adminEmail) {
    return { ok: false, message: "Non autorisé." };
  }

  const today = calendarDateStringInMontreal();
  const parsedDate = parsePlayDateString(playDateRaw);
  if (!parsedDate.ok) {
    return { ok: false, message: "Date invalide." };
  }

  if (isCalendarDateBeforeTodayMontreal(parsedDate.value, today)) {
    return { ok: false, message: "La date doit être aujourd’hui ou dans le futur." };
  }

  const parsedPayload = parsePuzzlePayload(payloadRaw);
  if (!parsedPayload.ok) {
    return { ok: false, message: parsedPayload.message };
  }

  const sr = createServiceRoleClient();
  const { error } = await sr.from("daily_puzzles").insert({
    play_date: parsedDate.value,
    payload: parsedPayload.data,
  });

  if (error) {
    if (error.code === "23505") {
      return { ok: false, message: duplicateDateMessage() };
    }
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin");
  return { ok: true };
}

export async function updateDailyPuzzle(
  id: string,
  playDateRaw: string,
  payloadRaw: unknown
): Promise<PuzzleActionResult> {
  const adminEmail = await getAdminEmailOrNull();
  if (!adminEmail) {
    return { ok: false, message: "Non autorisé." };
  }

  const today = calendarDateStringInMontreal();
  const parsedDate = parsePlayDateString(playDateRaw);
  if (!parsedDate.ok) {
    return { ok: false, message: "Date invalide." };
  }

  if (isCalendarDateBeforeTodayMontreal(parsedDate.value, today)) {
    return { ok: false, message: "La date doit être aujourd’hui ou dans le futur." };
  }

  const parsedPayload = parsePuzzlePayload(payloadRaw);
  if (!parsedPayload.ok) {
    return { ok: false, message: parsedPayload.message };
  }

  const sr = createServiceRoleClient();
  const { data: existing, error: fetchErr } = await sr
    .from("daily_puzzles")
    .select("id, play_date")
    .eq("id", id)
    .maybeSingle();

  if (fetchErr) {
    return { ok: false, message: fetchErr.message };
  }
  if (!existing) {
    return { ok: false, message: "Puzzle introuvable." };
  }

  if (isCalendarDateBeforeTodayMontreal(existing.play_date, today)) {
    return { ok: false, message: "Les puzzles passés ne peuvent pas être modifiés." };
  }

  const { error } = await sr
    .from("daily_puzzles")
    .update({
      play_date: parsedDate.value,
      payload: parsedPayload.data,
    })
    .eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return { ok: false, message: duplicateDateMessage() };
    }
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin");
  return { ok: true };
}

export async function deleteDailyPuzzle(id: string): Promise<PuzzleActionResult> {
  const adminEmail = await getAdminEmailOrNull();
  if (!adminEmail) {
    return { ok: false, message: "Non autorisé." };
  }

  const today = calendarDateStringInMontreal();
  const sr = createServiceRoleClient();
  const { data: existing, error: fetchErr } = await sr
    .from("daily_puzzles")
    .select("id, play_date")
    .eq("id", id)
    .maybeSingle();

  if (fetchErr) {
    return { ok: false, message: fetchErr.message };
  }
  if (!existing) {
    return { ok: false, message: "Puzzle introuvable." };
  }

  if (isCalendarDateBeforeTodayMontreal(existing.play_date, today)) {
    return { ok: false, message: "Les puzzles passés ne peuvent pas être supprimés." };
  }

  const { error } = await sr.from("daily_puzzles").delete().eq("id", id);

  if (error) {
    return { ok: false, message: error.message };
  }

  revalidatePath("/admin");
  return { ok: true };
}
