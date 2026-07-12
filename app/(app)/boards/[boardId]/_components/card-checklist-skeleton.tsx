import { CheckSquare } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

export function CardChecklistSkeleton() {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
        <CheckSquare className="size-4" />
        <Skeleton className="h-4 w-24" />
      </div>
      <Skeleton className="mb-2 h-2 w-full rounded-full" />
      <div className="flex flex-col gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2.5 px-1.5 py-1">
            <Skeleton className="size-4 rounded-sm" />
            <Skeleton className="h-3.5 flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
