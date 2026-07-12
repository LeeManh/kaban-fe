import { Skeleton } from "@/components/ui/skeleton";

export function BoardCardSkeleton() {
  return (
    <div className="flex h-30 flex-col overflow-hidden rounded-md bg-card shadow-sm">
      <Skeleton className="min-h-0 flex-1 rounded-none" />
      <div className="flex h-9 shrink-0 items-center px-3.5">
        <Skeleton className="h-3.5 w-2/3" />
      </div>
    </div>
  );
}
