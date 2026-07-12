import { MessageSquare } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

export function CardCommentsSkeleton() {
  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-5">
      <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
        <MessageSquare className="size-4" />
        Comments
      </div>

      <Skeleton className="h-16 w-full" />

      <div className="flex flex-col gap-3">
        {[0, 1].map((i) => (
          <div key={i} className="flex gap-2.5">
            <Skeleton className="size-7 shrink-0 rounded-full" />
            <div className="min-w-0 flex-1">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="mt-1.5 h-10 w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
