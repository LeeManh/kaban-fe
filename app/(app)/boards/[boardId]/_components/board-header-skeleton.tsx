import { Skeleton } from "@/components/ui/skeleton";

export function BoardHeaderSkeleton() {
  return (
    <div className="flex h-14 flex-none items-center gap-1.5 border-b border-border bg-background px-4">
      <Skeleton className="h-5 w-36" />
      <div className="flex-1" />
      <div className="flex -space-x-1.5">
        <Skeleton className="size-5.5 rounded-full ring-2 ring-background" />
        <Skeleton className="size-5.5 rounded-full ring-2 ring-background" />
        <Skeleton className="size-5.5 rounded-full ring-2 ring-background" />
      </div>
      <div className="mx-1 h-5 w-px bg-border" />
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-8 w-8" />
      <Skeleton className="h-8 w-8" />
      <Skeleton className="h-8 w-8" />
    </div>
  );
}
