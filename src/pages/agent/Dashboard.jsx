import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { User as UserIcon, Clock, Phone, CheckCircle } from "lucide-react";

export default function AgentDashboard() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // Tabs and date range state
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const [selectedTab, setSelectedTab] = useState("year");
  const [dateRange, setDateRange] = useState([firstDayOfMonth, lastDayOfMonth]);
  const [startDate, endDate] = dateRange;
  const [useCustomRange, setUseCustomRange] = useState(false);

  const TAB_OPTIONS = [
    { key: "year", label: "This Year" },
    { key: "quarter", label: "This Quarter" },
    { key: "month", label: "This Month" },
    { key: "week", label: "This Week" },
    { key: "today", label: "Today" },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://sayas-ai.ddns.net/all-leads");
        const data = await response.json();
        setLeads(data.leads || []);
      } catch (error) {
        console.error("Error fetching leads:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  function filterLeadsByTab(leads, tab) {
    const now = new Date();
    return leads.filter((lead) => {
      if (!lead.uploaded_at) return false;
      const date = new Date(lead.uploaded_at);
      if (useCustomRange && startDate && endDate) {
        return date >= startDate && date <= endDate;
      }
      switch (tab) {
        case "today":
          return date.toDateString() === now.toDateString();
        case "week": {
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay());
          startOfWeek.setHours(0, 0, 0, 0);
          return date >= startOfWeek && date <= now;
        }
        case "month":
          return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
        case "quarter": {
          const quarter = Math.floor(now.getMonth() / 3);
          return (
            Math.floor(date.getMonth() / 3) === quarter &&
            date.getFullYear() === now.getFullYear()
          );
        }
        case "year":
          return date.getFullYear() === now.getFullYear();
        default:
          return true;
      }
    });
  }

  const filteredLeads = filterLeadsByTab(
    leads.filter((lead) => {
      const matchesSearch =
        lead.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        String(lead.phone || "").includes(search);
      return matchesSearch;
    }),
    selectedTab
  );

  const stats = {
    total: filteredLeads.length,
    completed: filteredLeads.filter((l) => l.status === "completed").length,
    pending: filteredLeads.filter((l) => l.status === "pending").length,
    inProgress: filteredLeads.filter((l) =>
      ["contacted", "aadhaar_uploaded", "details_extracted", "inProgress"].includes(l.status)
    ).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Unified Hero, Tabs, Stats, Progress Bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-2 border-b border-slate-200">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-400 to-blue-400 flex items-center justify-center">
                <UserIcon className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Welcome, Agent</h1>
                <p className="text-slate-600 text-sm md:text-base">Your daily goal: Complete 3 leads</p>
                <span className="text-xs text-slate-400 italic">"Success is the sum of small efforts repeated day in and day out."</span>
              </div>
            </div>
            <div className="flex gap-1 flex-wrap items-center justify-center">
              {TAB_OPTIONS.map((tab) => (
                <Button
                  key={tab.key}
                  onClick={() => { setSelectedTab(tab.key); setUseCustomRange(false); }}
                  className={`px-3 py-1.5 rounded-lg font-medium transition text-sm md:text-base ${
                    selectedTab === tab.key && !useCustomRange
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                  }`}
                  aria-pressed={selectedTab === tab.key && !useCustomRange}
                >
                  {tab.label}
                </Button>
              ))}
              <div className="flex items-center gap-2 ml-2">
                <span className="text-slate-700 text-xs md:text-sm">Date Range:</span>
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update) => { setDateRange(update); setUseCustomRange(true); }}
                  dateFormat="dd/MM/yyyy"
                  className="px-2 py-1 pr-8 min-w-[160px] rounded border border-slate-300 text-sm bg-white"
                  preventOpenOnFocus={true}
                  isClearable
                  placeholderText="Select range"
                  calendarClassName="z-50"
                />
                {useCustomRange && (
                  <Button
                    size="sm"
                    className="ml-2 px-2 py-1 rounded text-xs bg-slate-200 hover:bg-slate-300 text-slate-700"
                    onClick={() => { setDateRange([firstDayOfMonth, lastDayOfMonth]); setUseCustomRange(false); }}
                  >
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Horizontal Scrollable Stats Cards */}
          <div className="flex gap-4 overflow-x-auto pb-4 mb-6">
            <Card className="min-w-[180px] p-4 bg-white/70 backdrop-blur-md rounded-xl flex flex-col items-center justify-center">
              <CardHeader>
                <CardTitle className="flex flex-col items-center justify-center">
                  <UserIcon className="w-8 h-8 text-slate-600 mb-2" />
                  <span className="text-xs text-slate-500">Assigned Leads</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-2xl font-bold text-slate-900 mt-1">{stats.total}</span>
              </CardContent>
            </Card>
            <Card className="min-w-[180px] p-4 bg-white/70 backdrop-blur-md rounded-xl flex flex-col items-center justify-center">
              <CardHeader>
                <CardTitle className="flex flex-col items-center justify-center">
                  <Clock className="w-8 h-8 text-amber-600 mb-2" />
                  <span className="text-xs text-slate-500">Pending</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-2xl font-bold text-amber-600 mt-1">{stats.pending}</span>
              </CardContent>
            </Card>
            <Card className="min-w-[180px] p-4 bg-white/70 backdrop-blur-md rounded-xl flex flex-col items-center justify-center">
              <CardHeader>
                <CardTitle className="flex flex-col items-center justify-center">
                  <Phone className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-xs text-slate-500">In Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-2xl font-bold text-blue-600 mt-1">{stats.inProgress}</span>
              </CardContent>
            </Card>
            <Card className="min-w-[180px] p-4 bg-white/70 backdrop-blur-md rounded-xl flex flex-col items-center justify-center">
              <CardHeader>
                <CardTitle className="flex flex-col items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-emerald-600 mb-2" />
                  <span className="text-xs text-slate-500">Completed</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <span className="text-2xl font-bold text-emerald-600 mt-1">{stats.completed}</span>
              </CardContent>
            </Card>
          </div>

          {/* Progress Bar for completion rate */}
          <div className="w-full bg-slate-200 rounded-full h-3 mb-8">
            <div
              className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%` }}
            ></div>
          </div>
        </div>

        {/* Recent Activity (placeholder) */}
        <div className="mb-8">
          <div className="bg-white/80 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Recent Activity</h2>
            <ul className="space-y-2">
              <li className="text-sm text-slate-700">You called Kanya <span className="text-xs text-slate-400 ml-2">2h ago</span></li>
              <li className="text-sm text-slate-700">Uploaded docs for Liyakat <span className="text-xs text-slate-400 ml-2">4h ago</span></li>
              <li className="text-sm text-slate-700">Completed lead for Chhatragun <span className="text-xs text-slate-400 ml-2">Yesterday</span></li>
            </ul>
          </div>
        </div>

        {/* Quick Actions (placeholder) */}
        <div className="fixed bottom-8 right-8 z-50">
          <Button className="bg-gradient-to-tr from-emerald-500 to-blue-500 text-white rounded-full p-4 hover:scale-105 transition flex items-center gap-2 text-lg font-bold">
            + Quick Action
          </Button>
        </div>
      </div>
    </div>
  );
}
