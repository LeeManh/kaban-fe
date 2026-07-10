import { RequireAuth } from "@/components/auth-guard";

import { AppShell } from "./_context/app-shell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <RequireAuth>{children}</RequireAuth>
    </AppShell>
  );
}
