import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { Users, CheckCircle, Clock, Upload, TrendingUp, UserCheck } from "lucide-react";

// Components
import StatsCard from "../../components/admin/StatsCard";
import RecentActivity from "../../components/admin/RecentActivity";
import ProgressChart from "../../components/admin/ProgressChart";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";



function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]); // You can hook this up later to MongoDB or Firebase
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("year");
  // Date range state
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
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

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("https://sayas-ai.ddns.net/all-leads");
        const data = await res.json();
        setLeads(data.leads || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching leads", error);
        setIsLoading(false);
      }
    };
    fetchLeads();
  }, []);

  // Filter leads by selected tab
  const filteredLeads = filterLeadsByTab(leads, selectedTab);

  const getStats = () => {
    const total = filteredLeads.length;
    const completed = filteredLeads.filter((lead) => lead.status === "completed").length;
    const inProgress = filteredLeads.filter((lead) =>
      ["contacted", "aadhaar_uploaded", "details_extracted", "inProgress"].includes(lead.status)
    ).length;
    const pending = filteredLeads.filter((lead) => lead.status === "pending").length;

    return { total, completed, pending, inProgress };
  };

  const stats = getStats();

  const recentLeads = [...filteredLeads]
    .filter((l) => l.uploaded_at)
    .sort((a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at))
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-0">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-8 pb-2 gap-2 border-b border-slate-200">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">Dashboard</h1>
            <p className="text-slate-600 text-sm md:text-base">Monitor lead progress and manage your team</p>
          </div>
          <div className="flex gap-2 md:gap-3 flex-wrap">
            <Link to="/analytics">
              <Button variant="outline" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                View Analytics
              </Button>
            </Link>
            <Link to="/upload-leads">
              <Button className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Leads
              </Button>
            </Link>
          </div>
        </div>

        {/* Tabs and Date Range Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between py-3 border-b border-slate-100 mb-4 gap-2">
          <div className="flex gap-1 justify-center flex-wrap">
            {TAB_OPTIONS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => { setSelectedTab(tab.key); setUseCustomRange(false); }}
                className={`px-3 py-1.5 rounded-lg font-medium transition text-sm md:text-base ${
                  selectedTab === tab.key && !useCustomRange
                    ? "bg-emerald-600 text-white shadow"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                }`}
                aria-pressed={selectedTab === tab.key && !useCustomRange}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 justify-center">
            <span className="text-slate-700 text-sm">Date Range:</span>
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
              <button
                className="ml-2 px-2 py-1 rounded text-xs bg-slate-200 hover:bg-slate-300 text-slate-700"
                onClick={() => { setDateRange([firstDayOfMonth, lastDayOfMonth]); setUseCustomRange(false); }}
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
          <StatsCard title="Total Leads" value={stats.total} icon={Users} color="slate" trend="+12% this week" />
          <StatsCard
            title="Completed"
            value={stats.completed}
            icon={CheckCircle}
            color="emerald"
            trend={`${stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% completion rate`}
          />
          <StatsCard title="In Progress" value={stats.inProgress} icon={Clock} color="amber" trend="Active workflows" />
          <StatsCard title="Pending" value={stats.pending} icon={UserCheck} color="red" trend="Pending follow-up" />
        </div>

        {/* Charts and Recent Activity Section */}
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-6">
          <div className="lg:col-span-2">
            <ProgressChart leads={filteredLeads} />
          </div>
          <div>
            <RecentActivity leads={recentLeads} />
          </div>
        </div>

        {/* Quick Actions Section */}
        <Card className="mt-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              <Link to="/upload-leads">
                <Button variant="secondary" className="w-full justify-start">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Leads
                </Button>
              </Link>
              <Link to="/all-leads">
                <Button variant="secondary" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Manage All Leads
                </Button>
              </Link>
              <Link to="/analytics">
                <Button variant="secondary" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Detailed Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
