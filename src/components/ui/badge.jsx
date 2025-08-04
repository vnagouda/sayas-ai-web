export function Badge({ children, className = "" }) {
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded ${className}`}>
      {children}
    </span>
  );
}
