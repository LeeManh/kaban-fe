import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { CircleAlert } from "lucide-react";

import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  "aria-invalid": ariaInvalid,
  hideInvalidIcon = false,
  ...props
}: React.ComponentProps<"input"> & { hideInvalidIcon?: boolean }) {
  const invalid = (ariaInvalid === true || ariaInvalid === "true") && !hideInvalidIcon;

  return (
    <div className="relative">
      <InputPrimitive
        type={type}
        data-slot="input"
        aria-invalid={ariaInvalid}
        className={cn(
          "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          invalid && "pr-9",
          className,
        )}
        {...props}
      />
      {invalid && (
        <CircleAlert className="absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-destructive" />
      )}
    </div>
  );
}

export { Input };
