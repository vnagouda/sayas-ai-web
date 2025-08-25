import React from 'react';

const Switch = ({ checked, onCheckedChange, className, ...props }) => (
  <button
    role="switch"
    aria-checked={checked}
    className={`
      relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
      transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 
      focus-visible:ring-slate-500 focus-visible:ring-opacity-75
      ${checked ? 'bg-emerald-600' : 'bg-slate-200'}
      ${className || ''}
    `}
    onClick={() => onCheckedChange(!checked)}
    {...props}
  >
    <span
      className={`
        pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg 
        ring-0 transition duration-200 ease-in-out
        ${checked ? 'translate-x-4' : 'translate-x-0'}
      `}
    />
  </button>
);

export { Switch };
