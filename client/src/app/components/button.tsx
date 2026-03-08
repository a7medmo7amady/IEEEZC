import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ieee-blue/50 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-ieee-blue text-white hover:bg-ieee-blue-hover",
        gold: "bg-zc-gold text-white hover:bg-zc-gold-hover",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
        outline:
          "border border-ieee-blue/30 bg-white text-charcoal hover:bg-ieee-blue/5",
        secondary:
          "bg-charcoal/10 text-charcoal hover:bg-charcoal/20",
        ghost:
          "text-charcoal hover:bg-ieee-blue/5",
        link: "text-ieee-blue underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-5 py-2",
        sm: "h-8 gap-1.5 px-4 text-xs",
        lg: "h-11 px-8 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
