import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Search, FileCheck, FileText } from 'lucide-react';

export default function Records() {
  const [activeTab, setActiveTab] = useState("ocr");
  const [search, setSearch] = useState("");

  // Sample data
  const ocrRecords = [
    {
      id: 1,
      leadName: "John Doe",
      aadhaarNumber: "XXXX-XXXX-1234",
      extractedDate: "2025-08-25",
      verificationStatus: "Verified",
      leadId: "LEAD001"
    },
    // Add more sample records
  ];

  const policyRecords = [
    {
      id: 1,
      policyNumber: "POL-2025-001",
      leadName: "John Doe",
      plan: "Term Life",
      premium: "₹12,000",
      startDate: "2025-08-25",
      agent: "Agent 1",
      leadId: "LEAD001"
    },
    // Add more sample records
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Records</h1>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="ocr" className="flex items-center gap-2">
            <FileCheck className="w-4 h-4" />
            OCR Records
          </TabsTrigger>
          <TabsTrigger value="policy" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Policy Records
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ocr">
          <Card>
            <CardHeader>
              <CardTitle>OCR Records</CardTitle>
              <CardDescription>
                View and manage OCR data extracted from Aadhaar documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    className="pl-10"
                    placeholder="Search by lead name or Aadhaar number"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lead Name</TableHead>
                      <TableHead>Aadhaar Number</TableHead>
                      <TableHead>Extracted Date</TableHead>
                      <TableHead>Verification</TableHead>
                      <TableHead>Lead ID</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ocrRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.leadName}</TableCell>
                        <TableCell>{record.aadhaarNumber}</TableCell>
                        <TableCell>{record.extractedDate}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                            {record.verificationStatus}
                          </span>
                        </TableCell>
                        <TableCell>{record.leadId}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policy">
          <Card>
            <CardHeader>
              <CardTitle>Policy Records</CardTitle>
              <CardDescription>
                View and manage policy documents and details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    className="pl-10"
                    placeholder="Search by policy number or lead name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Policy Number</TableHead>
                      <TableHead>Lead Name</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Premium</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Agent</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {policyRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell>{record.policyNumber}</TableCell>
                        <TableCell>{record.leadName}</TableCell>
                        <TableCell>{record.plan}</TableCell>
                        <TableCell>{record.premium}</TableCell>
                        <TableCell>{record.startDate}</TableCell>
                        <TableCell>{record.agent}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Download Policy</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
