import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-normal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[#0B1F3A] text-white shadow-sm hover:bg-[#102B4E] focus-visible:ring-[#0B1F3A]",
        accent:
          "bg-[#F59E0B] text-[#0B1F3A] shadow-[0_14px_30px_rgba(245,158,11,0.28)] hover:bg-[#f8aa27] focus-visible:ring-[#F59E0B]",
        teal:
          "bg-[#13B8A6] text-white shadow-[0_14px_30px_rgba(19,184,166,0.22)] hover:bg-[#0F9F91] focus-visible:ring-[#13B8A6]",
        outline:
          "border border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-slate-300 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10",
        ghost:
          "text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-300 dark:text-slate-200 dark:hover:bg-white/10",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
