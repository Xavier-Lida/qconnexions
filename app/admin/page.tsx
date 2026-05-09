import { redirect } from "next/navigation";

import { AdminPuzzleDashboard } from "@/components/admin/admin-puzzle-dashboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SiteHeader } from "@/components/site-header";
import { isAdminEmail } from "@/lib/admin";
import { toAdminPuzzleListItem, type DailyPuzzleRow } from "@/lib/puzzles/admin-rows";
import { parsePuzzlePayload } from "@/lib/puzzles/payload-schema";
import { calendarDateStringInMontreal } from "@/lib/dates/montreal";
import { createClient } from "@/lib/supabase/server";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

export const metadata = {
  title: "Administration | Connexions Québec",
  description: "Gestion des puzzles quotidiens.",
};

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email || !isAdminEmail(user.email)) {
    redirect("/");
  }

  const today = calendarDateStringInMontreal();

  let loadError: string | null = null;
  let rows: DailyPuzzleRow[] = [];

  try {
    const sr = createServiceRoleClient();
    const { data, error } = await sr
      .from("daily_puzzles")
      .select("id, play_date, payload")
      .order("play_date", { ascending: false });

    if (error) {
      loadError = error.message;
    } else {
      rows = (data ?? []).flatMap((row): DailyPuzzleRow[] => {
        const parsed = parsePuzzlePayload(row.payload);
        if (!parsed.ok) {
          return [];
        }
        return [
          {
            id: row.id,
            play_date: row.play_date as string,
            payload: parsed.data,
          },
        ];
      });
    }
  } catch (e) {
    loadError = e instanceof Error ? e.message : "Impossible de joindre la base.";
  }

  const items = rows.map((r) => toAdminPuzzleListItem(r, today));

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <SiteHeader
        title="Administration"
        description="Gestion des puzzles quotidiens."
        secondaryLink={{ href: "/", label: "Retour au puzzle" }}
      />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6 xl:max-w-6xl">
        {loadError ? (
          <Alert variant="destructive" className="mb-6">
            <AlertTitle>Chargement impossible</AlertTitle>
            <AlertDescription className="space-y-2">
              <p>{loadError}</p>
              {loadError.includes("SUPABASE_SERVICE_ROLE_KEY") ? (
                <p>
                  Cette clé sert uniquement côté serveur pour l’admin (la clé publique n’a pas accès à
                  <code className="mx-1 rounded bg-muted px-1 py-0.5 font-mono text-xs">daily_puzzles</code>
                  ). Redémarre le serveur de dev après modification de
                  <code className="mx-1 rounded bg-muted px-1 py-0.5 font-mono text-xs">.env.local</code>.
                </p>
              ) : null}
            </AlertDescription>
          </Alert>
        ) : null}
        <AdminPuzzleDashboard todayMontreal={today} items={items} />
      </main>
    </div>
  );
}
