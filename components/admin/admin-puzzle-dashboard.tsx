"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import {
  createDailyPuzzle,
  deleteDailyPuzzle,
  updateDailyPuzzle,
} from "@/app/actions/puzzles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PUZZLE_TIME_ZONE } from "@/lib/dates/montreal";
import type { GroupColor } from "@/lib/puzzles/demo";
import type { AdminPuzzleListItem } from "@/lib/puzzles/admin-rows";
import type { PuzzlePayloadParsed } from "@/lib/puzzles/payload-schema";
import { cn } from "@/lib/utils";

type CategoryDraft = {
  label: string;
  color: GroupColor;
  words: [string, string, string, string];
};

type FormDraft = {
  playDate: string;
  categories: [CategoryDraft, CategoryDraft, CategoryDraft, CategoryDraft];
};

const COLOR_OPTIONS: { value: GroupColor; label: string }[] = [
  { value: "navy", label: "Marine" },
  { value: "sky", label: "Ciel" },
  { value: "white", label: "Blanc" },
  { value: "gold", label: "Or" },
];

function emptyCategories(): FormDraft["categories"] {
  const one = (): CategoryDraft => ({
    label: "",
    color: "navy",
    words: ["", "", "", ""],
  });
  return [one(), one(), one(), one()];
}

function emptyForm(today: string): FormDraft {
  return { playDate: today, categories: emptyCategories() };
}

function formFromEditable(playDate: string, payload: PuzzlePayloadParsed): FormDraft {
  return {
    playDate,
    categories: payload.map((c) => ({
      label: c.label,
      color: c.color,
      words: [...c.words] as [string, string, string, string],
    })) as FormDraft["categories"],
  };
}

function draftToPayloadRaw(categories: FormDraft["categories"]): unknown {
  return categories.map((c) => ({
    label: c.label,
    color: c.color,
    words: c.words,
  }));
}

function formatPlayDateFr(playDate: string): string {
  const [y, m, d] = playDate.split("-").map(Number);
  const dt = new Date(y!, m! - 1, d!);
  return new Intl.DateTimeFormat("fr-CA", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: PUZZLE_TIME_ZONE,
  }).format(dt);
}

function ReadonlyPuzzleRow(props: { playDate: string; themeLabels: readonly string[] }) {
  return (
    <li
      className={cn(
        "rounded-2xl border border-border bg-muted/30 px-4 py-3",
        "text-muted-foreground"
      )}
    >
      <p className="font-medium capitalize text-foreground">{formatPlayDateFr(props.playDate)}</p>
      <p className="mt-1 text-xs">{props.themeLabels.join(" · ")}</p>
      <p className="mt-2 text-xs italic">Passé — lecture seule</p>
    </li>
  );
}

function EditablePuzzleRow(props: {
  playDate: string;
  themeLabels: readonly string[];
  onEdit: () => void;
  onDelete: () => void;
  busy: boolean;
}) {
  return (
    <li className="rounded-2xl border border-border bg-card px-4 py-3 shadow-sm">
      <p className="font-medium capitalize text-foreground">{formatPlayDateFr(props.playDate)}</p>
      <p className="mt-1 text-xs text-muted-foreground">{props.themeLabels.join(" · ")}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button type="button" size="sm" variant="secondary" disabled={props.busy} onClick={props.onEdit}>
          Modifier
        </Button>
        <Button type="button" size="sm" variant="destructive" disabled={props.busy} onClick={props.onDelete}>
          Supprimer
        </Button>
      </div>
    </li>
  );
}

function PuzzleRow(props: {
  item: AdminPuzzleListItem;
  busy: boolean;
  onEdit: (item: AdminPuzzleListItem & { access: "editable" }) => void;
  onDelete: (id: string) => void;
}) {
  switch (props.item.access) {
    case "readonly":
      return <ReadonlyPuzzleRow playDate={props.item.playDate} themeLabels={props.item.themeLabels} />;
    case "editable": {
      const row = props.item;
      return (
        <EditablePuzzleRow
          playDate={row.playDate}
          themeLabels={row.themeLabels}
          busy={props.busy}
          onEdit={() => {
            props.onEdit(row);
          }}
          onDelete={() => {
            props.onDelete(row.id);
          }}
        />
      );
    }
    default:
      return null;
  }
}

export function AdminPuzzleDashboard(props: {
  todayMontreal: string;
  items: AdminPuzzleListItem[];
}) {
  const router = useRouter();
  const [draft, setDraft] = useState<FormDraft>(() => emptyForm(props.todayMontreal));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const takenDates = useMemo(
    () =>
      new Set(
        props.items
          .filter((i) => (editingId ? i.id !== editingId : true))
          .map((i) => i.playDate)
      ),
    [props.items, editingId]
  );

  const resetToCreate = () => {
    setEditingId(null);
    setDraft(emptyForm(props.todayMontreal));
  };

  const handleEdit = (item: AdminPuzzleListItem & { access: "editable" }) => {
    setEditingId(item.id);
    setDraft(formFromEditable(item.playDate, item.payload));
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm("Supprimer ce puzzle ?");
    if (!ok) return;
    setPending(true);
    const res = await deleteDailyPuzzle(id);
    setPending(false);
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast.success("Puzzle supprimé.");
    if (editingId === id) {
      resetToCreate();
    }
    router.refresh();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (takenDates.has(draft.playDate)) {
      toast.error("Un puzzle existe déjà pour cette date.");
      return;
    }
    setPending(true);
    const payloadRaw = draftToPayloadRaw(draft.categories);
    const res = editingId
      ? await updateDailyPuzzle(editingId, draft.playDate, payloadRaw)
      : await createDailyPuzzle(draft.playDate, payloadRaw);
    setPending(false);
    if (!res.ok) {
      toast.error(res.message);
      return;
    }
    toast.success(editingId ? "Puzzle mis à jour." : "Puzzle ajouté.");
    resetToCreate();
    router.refresh();
  };

  const updateCategory = (index: number, patch: Partial<CategoryDraft>) => {
    setDraft((prev) => {
      const next = { ...prev, categories: [...prev.categories] as FormDraft["categories"] };
      next.categories[index] = { ...next.categories[index]!, ...patch };
      return next;
    });
  };

  const updateWord = (catIndex: number, wordIndex: number, value: string) => {
    setDraft((prev) => {
      const cats = [...prev.categories] as FormDraft["categories"];
      const words = [...cats[catIndex]!.words] as [string, string, string, string];
      words[wordIndex] = value;
      cats[catIndex] = { ...cats[catIndex]!, words };
      return { ...prev, categories: cats };
    });
  };

  return (
    <div className="grid flex-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,26rem)] lg:gap-10">
      <section className="min-w-0">
        <h2 className="font-heading text-lg font-medium text-foreground">Puzzles planifiés</h2>
        <p className="mt-1 text-sm text-muted-foreground">Fuseau&nbsp;: {PUZZLE_TIME_ZONE}</p>
        <ul className="mt-4 flex flex-col gap-3">
          {props.items.length === 0 ? (
            <li className="text-sm text-muted-foreground">Aucun puzzle en base.</li>
          ) : (
            props.items.map((item) => (
              <PuzzleRow
                key={item.id}
                item={item}
                busy={pending}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </ul>
      </section>

      <section className="min-w-0 lg:border-l lg:border-border lg:pl-10">
        <h2 className="font-heading text-lg font-medium text-foreground">
          {editingId ? "Modifier le puzzle" : "Ajouter un puzzle"}
        </h2>
        <form className="mt-4 flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="play-date">Date du puzzle</Label>
            <Input
              id="play-date"
              type="date"
              required
              min={props.todayMontreal}
              value={draft.playDate}
              disabled={pending}
              onChange={(ev) => {
                setDraft((d) => ({ ...d, playDate: ev.target.value }));
              }}
            />
          </div>

          {draft.categories.map((cat, ci) => (
            <fieldset key={ci} className="space-y-3 rounded-2xl border border-border bg-card/50 p-4">
              <legend className="px-1 text-sm font-medium text-foreground">Thème {ci + 1}</legend>
              <div className="space-y-2">
                <Label htmlFor={`label-${ci}`}>Libellé</Label>
                <Input
                  id={`label-${ci}`}
                  value={cat.label}
                  disabled={pending}
                  onChange={(ev) => {
                    updateCategory(ci, { label: ev.target.value });
                  }}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`color-${ci}`}>Couleur</Label>
                <select
                  id={`color-${ci}`}
                  className="flex h-9 w-full rounded-4xl border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:opacity-50"
                  value={cat.color}
                  disabled={pending}
                  onChange={(ev) => {
                    updateCategory(ci, { color: ev.target.value as GroupColor });
                  }}
                >
                  {COLOR_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                {cat.words.map((w, wi) => (
                  <div key={wi} className="space-y-1">
                    <Label htmlFor={`w-${ci}-${wi}`} className="text-xs">
                      Mot {wi + 1}
                    </Label>
                    <Input
                      id={`w-${ci}-${wi}`}
                      value={w}
                      disabled={pending}
                      onChange={(ev) => {
                        updateWord(ci, wi, ev.target.value);
                      }}
                      required
                    />
                  </div>
                ))}
              </div>
            </fieldset>
          ))}

          <div className="flex flex-wrap gap-2">
            <Button type="submit" disabled={pending}>
              {editingId ? "Enregistrer" : "Ajouter"}
            </Button>
            {editingId ? (
              <Button type="button" variant="outline" disabled={pending} onClick={resetToCreate}>
                Annuler la modification
              </Button>
            ) : null}
          </div>
        </form>
      </section>
    </div>
  );
}
