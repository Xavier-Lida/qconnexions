import { LoginForm } from "@/components/auth/login-form";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Connexion | Connexions Québec",
  description: "Connecte-toi pour sauvegarder ta progression (bientôt).",
};

export default function ConnexionPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <SiteHeader
        title="Se connecter"
        description="Accède à ton compte avec ton courriel et ton mot de passe."
        secondaryLink={{ href: "/", label: "Retour au puzzle" }}
      />

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-4 py-10 xl:max-w-6xl">
        <LoginForm />
      </main>
    </div>
  );
}
