import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function AuthBackLink() {
  return (
    <Link
      href="/"
      className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft className="size-4" />
      Back to home
    </Link>
  );
}
