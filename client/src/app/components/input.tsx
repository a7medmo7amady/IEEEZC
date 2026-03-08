import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "bg-white text-charcoal placeholder:text-charcoal/40",
        "w-full min-w-0 rounded-full border border-ieee-blue/20 px-4 py-2.5 text-sm",
        "transition-[border-color,box-shadow] outline-none",
        "focus-visible:border-ieee-blue focus-visible:ring-2 focus-visible:ring-ieee-blue/20",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-red-400 aria-invalid:ring-red-200",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
