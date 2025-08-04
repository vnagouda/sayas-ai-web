export function Button({ children, className = "", variant = "default", ...props }) {
  const base =
    "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "bg-white text-blue-600 border-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    secondary: "bg-slate-700 text-white hover:bg-slate-600 focus:ring-slate-500",
  };
  return (
    <button className={`${base} ${variants[variant] || ""} ${className}`} {...props}>
      {children}
    </button>
  );
}
