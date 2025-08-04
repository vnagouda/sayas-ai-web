import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const COLORS = ["#34D399", "#FBBF24", "#60A5FA", "#818CF8", "#F472B6"];

export default function ProgressChart({ leads }) {
  const grouped = leads.reduce((acc, lead) => {
    const key = lead.status || "unknown";
    acc[key] = acc[key] ? acc[key] + 1 : 1;
    return acc;
  }, {});

  const data = Object.entries(grouped).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
    value,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md">Lead Status Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        {data.length === 0 ? (
          <p className="text-slate-400 text-sm">No leads yet</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
