import React, { useEffect, useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "../../components/ui/dialog";

export default function AllLeads() {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("http://localhost:5000/all-leads");
        const data = await res.json();
        setLeads(data.leads || []);
        setFilteredLeads(data.leads || []);
      } catch (err) {
        console.error("Failed to fetch leads:", err);
      }
    };
    fetchLeads();
  }, []);

  useEffect(() => {
    let result = leads;
    if (search.trim() !== "") {
      result = result.filter(
        (l) =>
          Object.values(l).some(
            (val) =>
              typeof val === "string" &&
              val.toLowerCase().includes(search.toLowerCase())
          )
      );
    }
    if (statusFilter !== "all") {
      result = result.filter((l) => l.status === statusFilter);
    }
    setFilteredLeads(result);
  }, [search, statusFilter, leads]);

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

  const statusOptions = [
    "all",
    "pending",
    "contacted",
    "aadhaar_uploaded",
    "details_extracted",
    "completed",
  ];

  const allKeys = Array.from(
    new Set(filteredLeads.flatMap((lead) => Object.keys(lead)))
  );

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">All Leads</h1>

      <Card className="mb-6">
        <CardHeader className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <CardTitle className="text-base text-slate-700">Search & Filter</CardTitle>
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search by any field"
              className="border rounded px-3 py-2 w-full sm:w-64 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="border rounded px-3 py-2 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === "all" ? "All Statuses" : status.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
        </CardHeader>

        <CardContent className="overflow-auto max-h-[80vh]">
          <table className="w-full border text-sm table-auto">
            <thead className="bg-slate-100 sticky top-0 z-10">
              <tr>
                {allKeys.map((key) => (
                  <th
                    key={key}
                    className="text-left border px-2 py-2 whitespace-nowrap"
                  >
                    {key.replace(/_/g, " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead, idx) => (
                  <tr key={idx} className="cursor-pointer hover:bg-slate-100" onClick={() => setSelectedLead(lead)}>
                    {allKeys.map((col) => (
                      <td
                        key={col}
                        className="border px-2 py-2 whitespace-nowrap text-ellipsis overflow-hidden max-w-[200px]"
                      >
                        {col === "status" ? (
                          <Badge className={getStatusColor(lead[col])}>
                            {lead[col]?.replace(/_/g, " ") || "Unknown"}
                          </Badge>
                        ) : (
                          String(lead[col] || "")
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={allKeys.length} className="text-center text-gray-400 p-4">
                    No leads found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* 🪟 Modal for selected lead */}
      {selectedLead && (
        <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Lead Details</DialogTitle>
              <DialogDescription>
                Full information for:{" "}
                <strong>
                  {selectedLead.firstName || selectedLead.name || "Unknown"}
                </strong>
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 max-h-[400px] overflow-y-auto">
              {Object.entries(selectedLead).map(([key, value], i) => (
                <div key={i} className="text-sm">
                  <div className="font-semibold capitalize text-slate-700">
                    {key.replace(/_/g, " ")}
                  </div>
                  <div className="text-slate-900">
                    {typeof value === "boolean" ? value.toString() : value || "-"}
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter>
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 text-sm rounded bg-slate-200 hover:bg-slate-300"
              >
                Close
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
