// src/components/ui/alert.jsx
import * as React from "react";
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";

const VARIANT_ICONS = {
  default: Info,
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
};

const VARIANT_CLASSES = {
  default: "bg-slate-100 text-slate-800 border-slate-200",
  success: "bg-emerald-100 text-emerald-800 border-emerald-200",
  error: "bg-red-100 text-red-800 border-red-200",
  warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

export function Alert({ variant = "default", children }) {
  const Icon = VARIANT_ICONS[variant];
  const classes = `w-full flex items-start gap-3 border rounded-lg p-4 text-sm ${VARIANT_CLASSES[variant]}`;

  return (
    <div role="alert" className={classes}>
      {Icon && <Icon className="w-5 h-5 mt-0.5" />}
      <div>{children}</div>
    </div>
  );
}

export function AlertDescription({ children }) {
  return <div className="text-sm leading-relaxed">{children}</div>;
}
