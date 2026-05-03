import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 shadow-sm transition placeholder:text-slate-400 focus-visible:border-[#13B8A6] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#13B8A6]/15 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500",
        className,
      )}
      ref={ref}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
