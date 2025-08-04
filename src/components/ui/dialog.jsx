import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export const Dialog = DialogPrimitive.Root;

export const DialogTrigger = DialogPrimitive.Trigger;

export function DialogContent({ children, className, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/40 z-40" />
      <DialogPrimitive.Content
        className={`fixed z-50 top-1/2 left-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg ${className}`}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-4 right-4 text-slate-500 hover:text-slate-800">
          <X className="w-5 h-5" />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ children, className }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-xl font-semibold text-slate-800">{children}</h2>;
}

export function DialogDescription({ children }) {
  return <p className="text-sm text-slate-500">{children}</p>;
}

export function DialogFooter({ children, className }) {
  return <div className={`mt-6 flex justify-end ${className}`}>{children}</div>;
}
