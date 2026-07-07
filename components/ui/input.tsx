import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";
import { CircleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-2 focus-visible:border-ring disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50",
  {
    variants: {
      size: {
        default: "h-8",
        sm: "h-7",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

function Input({
  className,
  type,
  size = "default",
  "aria-invalid": ariaInvalid,
  hideInvalidIcon = false,
  ...props
}: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants> & { hideInvalidIcon?: boolean }) {
  const invalid = (ariaInvalid === true || ariaInvalid === "true") && !hideInvalidIcon;

  return (
    <div className="relative">
      <InputPrimitive
        type={type}
        data-slot="input"
        aria-invalid={ariaInvalid}
        className={cn(inputVariants({ size }), invalid && "pr-9", className)}
        {...props}
      />
      {invalid && (
        <CircleAlert className="absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-destructive" />
      )}
    </div>
  );
}

export { Input };
