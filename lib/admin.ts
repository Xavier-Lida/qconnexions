import "server-only";

const adminSet = new Set<string>();

function loadAdminEmails(): void {
  if (adminSet.size > 0) {
    return;
  }
  const raw = process.env.ADMIN_EMAILS ?? "";
  for (const part of raw.split(",")) {
    const email = part.trim().toLowerCase();
    if (email.length > 0) {
      adminSet.add(email);
    }
  }
}

export function isAdminEmail(email: string | undefined | null): boolean {
  if (!email) {
    return false;
  }
  loadAdminEmails();
  return adminSet.has(email.trim().toLowerCase());
}
