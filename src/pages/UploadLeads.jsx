import React, { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import {
  Upload,
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  Users,
  ArrowLeft,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Progress } from "../components/ui/progress";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

export default function UploadLeads() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadedData, setUploadedData] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file || !file.name.match(/\.(csv|xlsx)$/)) {
        setUploadStatus({ type: "error", message: "Please upload a valid CSV or Excel (.xlsx) file." });
        return;
    }

    setIsUploading(true);
    setUploadProgress(10);
    setUploadStatus(null);

    const reader = new FileReader();

    reader.onload = async (e) => {
        try {
        const rawdata = new Uint8Array(e.target.result);
        const workbook = XLSX.read(rawdata, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        if (!jsonData.length) {
            throw new Error("No valid rows found in file");
        }

        setUploadProgress(50);

        const response = await fetch("https://sayas-ai.ddns.net/upload-leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ leads: jsonData }),
        });

        const data = await response.json();

        if (data.success) {
            setUploadProgress(100);
            setUploadedData(jsonData);
            setUploadStatus({
            type: "success",
            message: `${jsonData.length} leads uploaded successfully.`,
            });
        } else {
            throw new Error(data.message || "Upload failed");
        }
        } catch (error) {
        console.error("Upload error:", error);
        setUploadStatus({
            type: "error",
            message: error.message || "Something went wrong while uploading leads.",
        });
        } finally {
        setIsUploading(false);
        setUploadProgress(0);
        }
    };

    reader.readAsArrayBuffer(file);
  };



  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Upload Leads</h1>
          <p className="text-slate-500">Import lead data from CSV files</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/admin")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <Button
            variant="secondary"
            onClick={() => navigate("/all-leads")}
            className="ml-4"
          >
            View All Leads
        </Button>

      </div>

      {/* Upload Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            CSV File Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-emerald-400 transition-colors">
            <FileSpreadsheet className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Choose CSV File</h3>
            <p className="text-slate-600 mb-4">Upload a CSV file with lead information</p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xls,.xlsx"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
            >
              {isUploading ? "Processing..." : "Select CSV File"}
            </Button>
          </div>

          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Processing file...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {uploadStatus && (
            <Alert variant={uploadStatus.type === "error" ? "destructive" : "default"}>
              {uploadStatus.type === "error" ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              <AlertDescription>{uploadStatus.message}</AlertDescription>
            </Alert>
          )}

          <div className="bg-slate-50 rounded-lg p-4">
            <h4 className="font-medium text-slate-900 mb-2">CSV Format Requirements</h4>
            <p className="text-sm text-slate-600 mb-3">
              Your CSV file should include the following columns:
            </p>
            <div className="bg-white rounded border p-3 font-mono text-sm overflow-x-auto">
              name,phone,email,address<br />
              John Doe,+1234567890,john@example.com,123 Main St<br />
              Jane Smith,+0987654321,jane@example.com,456 Oak Ave
            </div>
            <p className="text-xs text-slate-500 mt-2">* name and phone are required fields</p>
          </div>
        </CardContent>
      </Card>

      {uploadedData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-emerald-600">
              <CheckCircle className="w-5 h-5" />
              Upload Successful
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 rounded-full p-3">
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {uploadedData.length} Leads Imported
                  </h3>
                  <p className="text-slate-600">
                    Leads have been successfully stored in the system
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => navigate("/all-leads")}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                >
                  View All Leads
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setUploadedData(null);
                    setUploadStatus(null);
                  }}
                >
                  Upload More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
