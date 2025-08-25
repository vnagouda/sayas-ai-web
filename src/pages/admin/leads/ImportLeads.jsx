import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Upload, AlertCircle, CheckCircle, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";

export default function ImportLeads() {
  const [file, setFile] = useState(null);
  const [mapping, setMapping] = useState({
    name: '',
    phone: '',
    email: '',
    source: '',
    tags: '',
  });
  const [preview, setPreview] = useState([]);
  const [dupeStrategy, setDupeStrategy] = useState('skip');
  const [importStatus, setImportStatus] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      // Read and parse CSV for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const rows = text.split('\\n');
        const headers = rows[0].split(',');
        setPreview(headers);
      };
      reader.readAsText(file);
    }
  };

  const handleImport = async () => {
    setImportStatus('processing');
    // Simulate import process
    setTimeout(() => {
      setImportStatus('success');
    }, 2000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Import Leads</h1>

      {/* File Upload */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Upload CSV File</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-upload"
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">CSV files only</p>
            </label>
          </div>
          {file && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-500" />
              {file.name}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFile(null)}
                className="ml-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {file && (
        <>
          {/* Column Mapping */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Map Columns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      value={mapping.name}
                      onChange={(e) =>
                        setMapping({ ...mapping, name: e.target.value })
                      }
                    >
                      <option value="">Select column</option>
                      {preview.map((header, i) => (
                        <option key={i} value={header}>
                          {header}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      value={mapping.phone}
                      onChange={(e) =>
                        setMapping({ ...mapping, phone: e.target.value })
                      }
                    >
                      <option value="">Select column</option>
                      {preview.map((header, i) => (
                        <option key={i} value={header}>
                          {header}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      value={mapping.email}
                      onChange={(e) =>
                        setMapping({ ...mapping, email: e.target.value })
                      }
                    >
                      <option value="">Select column</option>
                      {preview.map((header, i) => (
                        <option key={i} value={header}>
                          {header}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Source</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      value={mapping.source}
                      onChange={(e) =>
                        setMapping({ ...mapping, source: e.target.value })
                      }
                    >
                      <option value="">Select column</option>
                      {preview.map((header, i) => (
                        <option key={i} value={header}>
                          {header}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Tags</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      value={mapping.tags}
                      onChange={(e) =>
                        setMapping({ ...mapping, tags: e.target.value })
                      }
                    >
                      <option value="">Select column</option>
                      {preview.map((header, i) => (
                        <option key={i} value={header}>
                          {header}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Duplicate Handling */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Duplicate Handling</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <Button
                  variant={dupeStrategy === 'skip' ? 'default' : 'outline'}
                  onClick={() => setDupeStrategy('skip')}
                  className="w-full"
                >
                  Skip Duplicates
                </Button>
                <Button
                  variant={dupeStrategy === 'merge' ? 'default' : 'outline'}
                  onClick={() => setDupeStrategy('merge')}
                  className="w-full"
                >
                  Merge Data
                </Button>
                <Button
                  variant={dupeStrategy === 'overwrite' ? 'default' : 'outline'}
                  onClick={() => setDupeStrategy('overwrite')}
                  className="w-full"
                >
                  Overwrite
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Import Status */}
          {importStatus && (
            <Alert
              className={`mb-6 ${
                importStatus === 'success' ? 'bg-green-50' : 'bg-blue-50'
              }`}
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                {importStatus === 'processing'
                  ? 'Processing Import'
                  : 'Import Complete'}
              </AlertTitle>
              <AlertDescription>
                {importStatus === 'processing'
                  ? 'Please wait while we process your file...'
                  : 'Successfully imported leads with summary report.'}
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => setFile(null)}>
              Cancel
            </Button>
            <Button onClick={handleImport} disabled={importStatus === 'processing'}>
              Import Leads
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
