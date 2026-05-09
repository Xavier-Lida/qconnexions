import { PuzzleGame } from "@/components/puzzle/puzzle-game";
import { Button } from "@/components/ui/button";

function formatTodayFr(): string {
  return new Intl.DateTimeFormat("fr-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Montreal",
  }).format(new Date());
}

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between xl:max-w-6xl">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Connexions Québec
            </p>
            <h1 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              Puzzle du jour
            </h1>
            <p className="text-sm capitalize text-muted-foreground">{formatTodayFr()}</p>
          </div>
          <Button type="button" variant="outline" size="sm" className="shrink-0 self-start sm:self-center" disabled>
            Connexion (bientôt)
          </Button>
        </div>
      </header>

      <main className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col px-4 py-6 xl:max-w-6xl">
        <div className="flex min-h-0 flex-1 flex-col">
          <PuzzleGame />
        </div>
      </main>
    </div>
  );
}
