import { SignupForm } from "@/components/auth/signup-form";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Inscription | Connexions Québec",
  description: "Crée un compte Connexions Québec.",
};

export default function InscriptionPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <SiteHeader
        title="Créer un compte"
        description="Inscris-toi pour jouer avec un compte (fonctions à venir)."
        secondaryLink={{ href: "/", label: "Retour au puzzle" }}
      />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-10 xl:max-w-6xl">
        <SignupForm />
      </main>
    </div>
  );
}
