import { PuzzleGame } from "@/components/puzzle/puzzle-game";
import { SiteHeader } from "@/components/site-header";

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
      <SiteHeader
        title="Puzzle du jour"
        description={<p className="capitalize">{formatTodayFr()}</p>}
      />

      <main className="mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col px-4 py-6 xl:max-w-6xl">
        <div className="flex min-h-0 flex-1 flex-col">
          <PuzzleGame />
        </div>
      </main>
    </div>
  );
}
