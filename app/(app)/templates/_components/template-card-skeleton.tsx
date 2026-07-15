import { Skeleton } from "@/components/ui/skeleton";

export function TemplateCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-md bg-card shadow-sm">
      <Skeleton className="h-24 shrink-0 rounded-none" />
      <div className="flex flex-col gap-1.5 px-3.5 py-2.5">
        <Skeleton className="h-3.5 w-2/3" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}
