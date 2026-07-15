import { Home } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <Logo className="text-foreground" />

      <div>
        <p className="text-7xl font-bold tracking-tight text-foreground">404</p>
        <h1 className="mt-3 text-xl font-semibold text-foreground">Page not found</h1>
        <p className="mt-2 max-w-sm text-[13.5px] text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
      </div>

      <Button
        nativeButton={false}
        render={<Link href="/boards" />}
        className="cursor-pointer gap-1.75 shadow-[0_1px_2px_--theme(--color-primary/30%)]"
      >
        <Home className="size-4" />
        Back to boards
      </Button>
    </div>
  );
}
