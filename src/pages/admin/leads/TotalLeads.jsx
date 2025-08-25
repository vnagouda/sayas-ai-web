import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Download, Filter, Search, UserPlus } from 'lucide-react';

export default function TotalLeads() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [filters, setFilters] = useState({
    status: '',
    source: '',
    agent: '',
    docsReceived: '',
    search: '',
  });

  // Placeholder data - replace with actual data from API
  const leads = [
    {
      id: 1,
      name: "John Doe",
      phone: "+91 98765 43210",
      source: "Website",
      status: "New",
      agent: "Agent 1",
      docsReceived: "Yes",
      updatedAt: "2025-08-25",
    },
    // Add more sample data
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleBulkAction = (action) => {
    // Handle bulk actions (assign, status change, export)
    console.log(action, selectedRows);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Total Leads</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleBulkAction('export')}>
            <Download className="w-4 h-4 mr-2" />
            Export Selected
          </Button>
          <Button variant="outline" onClick={() => handleBulkAction('assign')}>
            <UserPlus className="w-4 h-4 mr-2" />
            Assign Selected
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="firstCallDone">First Call Done</SelectItem>
                <SelectItem value="docsRequested">Docs Requested</SelectItem>
                <SelectItem value="docsReceived">Docs Received</SelectItem>
                <SelectItem value="formFilled">Form Filled</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="paymentPending">Payment Pending</SelectItem>
                <SelectItem value="paymentReceived">Payment Received</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="closedLost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.source}
              onValueChange={(value) => handleFilterChange('source', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="campaign">Campaign</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.agent}
              onValueChange={(value) => handleFilterChange('agent', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Agent" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="agent1">Agent 1</SelectItem>
                <SelectItem value="agent2">Agent 2</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.docsReceived}
              onValueChange={(value) => handleFilterChange('docsReceived', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Docs Received" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                className="pl-10"
                placeholder="Search by name/phone"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>

            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              isClearable={true}
              placeholderText="Select date range"
              className="w-full p-2 border rounded"
            />
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedRows(leads.map(lead => lead.id));
                    } else {
                      setSelectedRows([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Docs</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(lead.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRows([...selectedRows, lead.id]);
                      } else {
                        setSelectedRows(selectedRows.filter(id => id !== lead.id));
                      }
                    }}
                  />
                </TableCell>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.phone}</TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>{lead.status}</TableCell>
                <TableCell>{lead.agent}</TableCell>
                <TableCell>{lead.docsReceived}</TableCell>
                <TableCell>{lead.updatedAt}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
