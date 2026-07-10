import type { CardLabel } from "@/lib/api/boards";
import { cn } from "@/lib/utils";

export function LabelSwatch({
  label,
  showText = true,
  className,
  style,
  ...props
}: React.ComponentProps<"span"> & {
  label: CardLabel;
  showText?: boolean;
}) {
  return (
    <span
      style={{ backgroundColor: label.color, ...style }}
      className={cn("flex items-center rounded-sm font-medium text-black", className)}
      {...props}
    >
      {showText && label.name}
    </span>
  );
}

export function getLabelTooltipText(label: CardLabel) {
  return `Color: ${label.color}, title: "${label.name}"`;
}
