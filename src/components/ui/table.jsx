import React from 'react';

const Table = ({ children, className, ...props }) => (
  <table className={`w-full border-collapse ${className || ''}`} {...props}>
    {children}
  </table>
);

const TableHeader = ({ children, className, ...props }) => (
  <thead className={`bg-slate-50 ${className || ''}`} {...props}>
    {children}
  </thead>
);

const TableBody = ({ children, className, ...props }) => (
  <tbody className={`${className || ''}`} {...props}>
    {children}
  </tbody>
);

const TableHead = ({ children, className, ...props }) => (
  <th className={`px-4 py-3 text-left text-sm font-medium text-slate-500 ${className || ''}`} {...props}>
    {children}
  </th>
);

const TableRow = ({ children, className, ...props }) => (
  <tr className={`border-b border-slate-200 ${className || ''}`} {...props}>
    {children}
  </tr>
);

const TableCell = ({ children, className, ...props }) => (
  <td className={`px-4 py-3 text-sm ${className || ''}`} {...props}>
    {children}
  </td>
);

export { Table, TableHeader, TableBody, TableHead, TableRow, TableCell };
