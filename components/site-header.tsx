import Link from "next/link";
import type { ReactNode } from "react";

import { SignOutButton } from "@/components/auth/sign-out-button";
import { Button } from "@/components/ui/button";
import { isAdminEmail } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

export type SiteHeaderProps = {
  title: string;
  description?: ReactNode;
  /** Lien visible à droite (ex. retour à l’accueil). */
  secondaryLink?: { href: string; label: string };
};

export async function SiteHeader({ title, description, secondaryLink }: SiteHeaderProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const email = user?.email;
  const showAdminLink = email ? isAdminEmail(email) : false;

  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between xl:max-w-6xl">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Connexions Québec
          </p>
          <h1 className="font-heading text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          {description ? <div className="text-sm text-muted-foreground">{description}</div> : null}
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2 self-start sm:self-center">
          {showAdminLink ? (
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin">Admin</Link>
            </Button>
          ) : null}
          {user ? <SignOutButton /> : null}
          {!user ? (
            <Button variant="outline" size="sm" asChild>
              <Link href="/connexion">Se connecter</Link>
            </Button>
          ) : null}
          {secondaryLink ? (
            <Button variant="outline" size="sm" asChild>
              <Link href={secondaryLink.href}>{secondaryLink.label}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
