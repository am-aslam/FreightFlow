import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
  tone?: "blue" | "teal" | "orange" | "muted";
};

const toneClasses = {
  blue: "border-[#0B1F3A]/10 bg-[#0B1F3A]/[0.08] text-[#0B1F3A] dark:border-white/10 dark:bg-white/10 dark:text-white",
  teal: "border-[#13B8A6]/20 bg-[#13B8A6]/10 text-[#0F766E]",
  orange: "border-[#F59E0B]/20 bg-[#F59E0B]/[0.12] text-[#92400E]",
  muted: "border-slate-200 bg-white/80 text-slate-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-200",
};

export function Badge({ className, tone = "muted", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold",
        toneClasses[tone],
        className,
      )}
      {...props}
    />
  );
}
