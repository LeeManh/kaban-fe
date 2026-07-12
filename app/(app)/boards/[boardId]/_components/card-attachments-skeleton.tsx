import { Paperclip } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

export function CardAttachmentsSkeleton() {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Paperclip className="size-4" />
        Attachments
      </div>
      <div className="flex flex-col gap-1">
        {[0, 1].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-md p-1.5">
            <Skeleton className="h-11 w-16 shrink-0 rounded-sm" />
            <div className="min-w-0 flex-1">
              <Skeleton className="h-3.5 w-40" />
              <Skeleton className="mt-1.5 h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
