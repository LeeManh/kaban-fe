import { cn } from "@/lib/utils";

export function Logo({
  className,
  textClassName,
  iconOnly = false,
}: {
  className?: string;
  textClassName?: string;
  iconOnly?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2 text-slate-900", className)}>
      <span className="flex size-6.5 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-blue-500 shadow-[0_3px_8px_-1px] shadow-blue-600/35">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="18" rx="1.5" />
          <rect x="14" y="3" width="7" height="11" rx="1.5" />
        </svg>
      </span>
      {!iconOnly && (
        <span className={cn("font-heading text-sm font-bold tracking-tight", textClassName)}>
          Kanvas
        </span>
      )}
    </div>
  );
}
