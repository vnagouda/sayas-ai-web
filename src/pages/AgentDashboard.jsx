import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  User as UserIcon,
  Clock,
  Phone,
  CheckCircle,
  Users,
  ArrowRight,
} from "lucide-react";

export default function AgentDashboard() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://13.239.29.113:5000/all-leads");
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

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      String(lead.phone || "").includes(search)
    return matchesSearch;
  });

  const stats = {
    total: leads.length,
    completed: leads.filter((l) => l.status === "completed").length,
    pending: leads.filter((l) => l.status === "pending").length,
    inProgress: leads.filter((l) =>
      ["contacted", "aadhaar_uploaded", "details_extracted", "inProgress"].includes(l.status)
    ).length,
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">All Leads</h1>
              <p className="text-slate-600">This shows all available leads in the system</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Today's Progress</p>
              <p className="text-2xl font-bold text-emerald-600">
                {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Total</p>
                  <p className="text-xl font-bold">{stats.total}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Pending</p>
                  <p className="text-xl font-bold text-amber-600">{stats.pending}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">In Progress</p>
                  <p className="text-xl font-bold text-blue-600">{stats.inProgress}</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Completed</p>
                  <p className="text-xl font-bold text-emerald-600">{stats.completed}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Leads List */}
        <div className="space-y-4">
          <AnimatePresence>
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                    </div>
                    <div className="h-6 bg-slate-200 rounded w-20"></div>
                  </div>
                </Card>
              ))
            ) : filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <motion.div
                  key={lead.phone}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-slate-900 mb-1">
                        {lead.firstName}
                      </h3>
                      <p className="text-slate-600 text-sm">📞 {lead.phone}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">
                        {lead.status?.replace(/_/g, " ") || "Unknown"}
                      </Badge>
                      <Button
                        variant="outline"
                        onClick={() =>
                          navigate(`/records/${encodeURIComponent(lead.phone)}`)
                        }
                      >
                        View <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <Card className="p-12 text-center">
                <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  No leads found
                </h3>
                <p className="text-slate-600">Try adjusting your search.</p>
              </Card>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
