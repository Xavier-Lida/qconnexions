"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const handleSignOut = async () => {
    setPending(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.refresh();
    setPending(false);
  };

  return (
    <Button type="button" variant="outline" size="sm" disabled={pending} onClick={handleSignOut}>
      Déconnexion
    </Button>
  );
}
