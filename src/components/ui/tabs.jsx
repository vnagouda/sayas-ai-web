// src/components/ui/tabs.jsx
import React, { useState, createContext, useContext } from "react";

const TabsContext = createContext();

export function Tabs({ children, defaultValue="lead" }) {
  const [activeIndex, setActiveIndex] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }) {
  return <div className="flex border-b">{children}</div>;
}

export function TabsTrigger({ value, children }) {
  const { activeIndex, setActiveIndex } = useContext(TabsContext);
  const isActive = activeIndex === value;

  return (
    <button
      onClick={() => setActiveIndex(value)}
      className={`px-4 py-2 text-sm font-medium ${
        isActive
          ? "border-b-2 border-emerald-600 text-emerald-700"
          : "text-slate-500 hover:text-slate-700"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  const { activeIndex } = useContext(TabsContext);
  return activeIndex === value ? <div className="py-4">{children}</div> : null;
}
