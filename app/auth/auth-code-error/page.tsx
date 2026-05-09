import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Lien invalide | Connexions Québec",
};

export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-background px-4 py-12">
      <Card size="sm" className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Lien invalide ou expiré</CardTitle>
          <CardDescription>
            Ce lien de confirmation ne fonctionne plus. Demande un nouveau courriel de
            vérification ou réessaie de te connecter.
          </CardDescription>
        </CardHeader>
        <CardContent />
        <CardFooter className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row">
          <Button className="w-full sm:flex-1" asChild>
            <Link href="/connexion">Connexion</Link>
          </Button>
          <Button variant="outline" className="w-full sm:flex-1" asChild>
            <Link href="/">Accueil</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
