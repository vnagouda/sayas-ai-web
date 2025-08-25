import React from 'react';

const Select = ({ children, className, ...props }) => (
  <select
    className={`
      block w-full rounded-md border border-slate-300 bg-white py-2 px-3 shadow-sm
      focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500
      sm:text-sm ${className || ''}
    `}
    {...props}
  >
    {children}
  </select>
);

const SelectContent = ({ children }) => children;

const SelectTrigger = ({ children, className, ...props }) => (
  <div className={`relative ${className || ''}`} {...props}>
    {children}
  </div>
);

const SelectValue = ({ placeholder }) => (
  <span className="block truncate">{placeholder}</span>
);

const SelectItem = ({ children, value, ...props }) => (
  <option value={value} {...props}>
    {children}
  </option>
);

export { Select, SelectContent, SelectTrigger, SelectValue, SelectItem };
