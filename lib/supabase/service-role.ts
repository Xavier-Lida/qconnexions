import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getSupabaseServiceRoleKey, getSupabaseUrl } from "@/lib/supabase/env";

const serviceRoleOptions = {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
} as const;

export function createServiceRoleClient() {
  return createClient(getSupabaseUrl(), getSupabaseServiceRoleKey(), serviceRoleOptions);
}

/** Pour lectures publiques optionnelles (ex. accueil) si la clé n’est pas définie en local. */
export function createServiceRoleClientOrNull() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!key) {
    return null;
  }
  return createClient(getSupabaseUrl(), key, serviceRoleOptions);
}
