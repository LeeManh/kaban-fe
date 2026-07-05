import { cn } from "@/lib/utils";

export function SectionEyebrow({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mb-3 text-xs font-bold tracking-[0.08em] text-primary uppercase",
        className
      )}
    >
      {children}
    </div>
  );
}
