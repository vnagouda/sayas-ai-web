import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

export default function RecentActivity({ leads }) {
  const recentLeads = [...leads].slice(-5).reverse();

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "contacted":
        return "bg-blue-100 text-blue-800";
      case "aadhaar_uploaded":
        return "bg-pink-100 text-pink-800";
      case "details_extracted":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {recentLeads.length === 0 ? (
          <p className="text-slate-400 text-sm">No recent leads</p>
        ) : (
          <ul className="space-y-3">
            {recentLeads.map((lead, index) => (
              <li key={index} className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-medium text-slate-800">{lead.firstName}</span>
                  <span className="text-xs text-slate-500">{lead.phone}</span>
                </div>
                <Badge className={getStatusColor(lead.status)}>{lead.status?.replace(/_/g, " ") || "Unknown"}</Badge>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
