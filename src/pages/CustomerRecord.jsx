import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";
import { PhoneCall } from "lucide-react";

export default function CustomerRecords() {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("http://localhost:5000/all-leads");
        const json = await res.json();
        setLeads(json.leads || []);
      } catch (err) {
        console.error("Error fetching leads:", err);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div className="p-6 lg:p-10 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Customer Records</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {leads.map((lead, idx) => (
          <div
            key={lead.phone || idx}
            onClick={() => navigate(`/records/${lead.phone}`)}
            className="cursor-pointer transition-shadow hover:shadow-lg"
          >
            <Card>
              <CardContent className="p-4">
                <div className="font-semibold text-lg text-slate-800">
                  {lead.firstName || "Unknown"}
                </div>
                <div className="text-slate-600 text-sm mt-1 flex items-center gap-1">
                  <PhoneCall className="w-4 h-4" /> {lead.phone}
                </div>
                <div className="text-xs text-slate-500 mt-2 capitalize">
                  Status: {lead.status || "N/A"}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
