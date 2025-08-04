// src/components/ui/progress.jsx
import * as React from "react";

export const Progress = React.forwardRef(({ value = 0 }, ref) => {
  return (
    <div
      ref={ref}
      className="relative w-full h-2 bg-slate-200 rounded-full overflow-hidden"
    >
      <div
        className="h-full bg-emerald-600 transition-all duration-300"
        style={{ width: `${value}%` }}
      />
    </div>
  );
});
Progress.displayName = "Progress";
