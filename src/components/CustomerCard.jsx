import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Eye, User } from "lucide-react";

export default function CustomerCard({ name, phone, status = "pending", onView }) {
  const statusClass = {
    completed: "bg-emerald-100 text-emerald-800",
    "aadhaar_uploaded": "bg-pink-100 text-pink-800",
    pending: "bg-yellow-100 text-yellow-800",
    contacted: "bg-blue-100 text-blue-800",
    default: "bg-gray-100 text-gray-700",
  };

  const getStatusClass = statusClass[status] || statusClass.default;

  return (
    <Card className="p-4">
      <CardHeader className="flex justify-between items-start">
        <CardTitle className="flex items-center gap-2 text-base">
          <User className="h-5 w-5" />
          {name}
        </CardTitle>
        <Badge className={getStatusClass}>
          {status.replace(/_/g, " ").toUpperCase()}
        </Badge>
      </CardHeader>
      <CardContent className="text-sm text-slate-500">
        <p>📞 {phone}</p>
        <Button
          onClick={onView}
          variant="default"
          className="w-full mt-4 flex justify-center gap-2"
        >
          <Eye className="h-4 w-4" />
          View Record
        </Button>
      </CardContent>
    </Card>
  );
}
