import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export default function StatsCard({ title, value, icon: Icon, color = "slate", trend }) {
  const iconColors = {
    slate: "text-slate-600 bg-slate-100",
    emerald: "text-emerald-600 bg-emerald-100",
    amber: "text-amber-600 bg-amber-100",
    blue: "text-blue-600 bg-blue-100",
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">{title}</CardTitle>
        <div className={`p-2 rounded-full ${iconColors[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{trend}</p>
      </CardContent>
    </Card>
  );
}
