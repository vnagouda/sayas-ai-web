import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Users, CheckCircle, Clock, Upload, TrendingUp, UserCheck } from "lucide-react";

// Components
import StatsCard from "../../components/admin/StatsCard";
import RecentActivity from "../../components/admin/RecentActivity";
import ProgressChart from "../../components/admin/ProgressChart";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [agents, setAgents] = useState([]); // You can hook this up later to MongoDB or Firebase
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch("http://sayas-ai.ddns.net/all-leads");
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

  const getStats = () => {
    const total = leads.length;
    const completed = leads.filter((lead) => lead.status === "completed").length;
    const inProgress = leads.filter((lead) =>
      ["contacted", "aadhaar_uploaded", "details_extracted", "inProgress"].includes(lead.status)
    ).length;
    const pending = leads.filter((lead) => lead.status === "pending").length;

    return { total, completed, pending, inProgress };
  };

  const stats = getStats();

  const recentLeads = [...leads]
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
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
            <p className="text-slate-600">Monitor lead progress and manage your team</p>
          </div>
          <div className="flex gap-3">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProgressChart leads={leads} />
          </div>
          <div>
            <RecentActivity leads={recentLeads} />
          </div>
        </div>

        <Card className="mt-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
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
