import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 scale-100 hover:scale-[1.02] active:scale-[0.98]",
        destructive:
          "bg-gradient-to-r from-red-600 to-rose-600 text-destructive-foreground shadow-lg shadow-red-500/25 hover:shadow-red-500/40 scale-100 hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border border-white/10 bg-black/20 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/20 scale-100 hover:scale-[1.02] active:scale-[0.98]",
        secondary:
          "bg-gradient-to-r from-slate-800 to-slate-700 text-white shadow-lg shadow-slate-900/25 hover:shadow-slate-900/40 scale-100 hover:scale-[1.02] active:scale-[0.98]",
        ghost:
          "hover:bg-white/10 hover:text-white text-white/80 backdrop-blur-sm scale-100 hover:scale-[1.02] active:scale-[0.98]",
        link: "text-white/80 underline-offset-4 hover:underline hover:text-white",
        glow: "relative bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 scale-100 hover:scale-[1.02] active:scale-[0.98] after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-r after:from-purple-600/0 after:via-white/20 after:to-purple-600/0 after:animate-shine after:pointer-events-none",
        neon: "relative bg-black/20 backdrop-blur-sm text-white border border-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.5)] hover:shadow-[0_0_25px_rgba(147,51,234,0.7)] hover:border-purple-400 scale-100 hover:scale-[1.02] active:scale-[0.98]",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-lg px-8 text-base",
        icon: "h-9 w-9",
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

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { buttonVariants };
