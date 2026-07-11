import { RequireAuth } from "@/components/auth-guard";

import { AppShell } from "./_context/app-shell";
import { SocketProvider } from "./_context/socket-provider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell>
      <RequireAuth>
        <SocketProvider>{children}</SocketProvider>
      </RequireAuth>
    </AppShell>
  );
}
