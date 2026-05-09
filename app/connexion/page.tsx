import Link from "next/link";

import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Connexion | Connexions Québec",
  description: "Connecte-toi pour sauvegarder ta progression (bientôt).",
};

export default function ConnexionPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between xl:max-w-6xl">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Connexions Québec
            </p>
            <h1 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
              Se connecter
            </h1>
            <p className="text-sm text-muted-foreground">
              Accède à ton compte avec ton courriel et ton mot de passe.
            </p>
          </div>
          <Button variant="outline" size="sm" className="shrink-0 self-start sm:self-center" asChild>
            <Link href="/">Retour au puzzle</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-10 xl:max-w-6xl">
        <LoginForm />
      </main>
    </div>
  );
}
