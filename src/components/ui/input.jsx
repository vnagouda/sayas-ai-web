import * as React from "react";

export const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";
