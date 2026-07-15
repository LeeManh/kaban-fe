import { FilePlusCorner } from "lucide-react";

export function TemplatesEmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <FilePlusCorner className="size-10 text-muted-foreground" />
      <p className="text-[13.5px] text-muted-foreground">{message}</p>
    </div>
  );
}
