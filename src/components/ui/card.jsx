export function Card({ className = "", children }) {
  return <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>;
}

export function CardHeader({ className = "", children }) {
  return <div className={`px-4 pt-4 ${className}`}>{children}</div>;
}

export function CardTitle({ className = "", children }) {
  return <h2 className={`text-lg font-semibold ${className}`}>{children}</h2>;
}

export function CardContent({ className = "", children }) {
  return <div className={`px-4 pb-4 ${className}`}>{children}</div>;
}
