import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import { Input } from "../components/ui/input";
import { ArrowLeft, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";

export default function LeadDetails() {
  const { phone } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [ocrData, setOcrData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("lead");
  const [newFieldKey, setNewFieldKey] = useState("");
  const [newFieldValue, setNewFieldValue] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showAddFieldModal, setShowAddFieldModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leadRes = await fetch(`http://localhost:5000/lead/${phone}`);
        const ocrRes = await fetch(`http://localhost:5000/ocr/${phone}`);

        const leadJson = await leadRes.json();
        const ocrJson = await ocrRes.json();

        setLead(leadJson.lead || {});
        setOcrData(ocrJson.record || {});
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [phone]);

  const handleOcrChange = (key, value) => {
    setOcrData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddNewField = () => {
    if (!newFieldKey.trim()) {
      alert("Field name is required.");
      return;
    }
    setOcrData((prev) => ({
      ...prev,
      [newFieldKey.trim()]: newFieldValue,
    }));
    setNewFieldKey("");
    setNewFieldValue("");
    setShowAddFieldModal(false);
  };

  const saveOcrData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/ocr/${phone}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ocrData),
      });

      if (res.ok) {
        setStatusMessage("✅ OCR data saved successfully!");
      } else {
        setStatusMessage("⚠️ Failed to save OCR data.");
      }
    } catch (err) {
      console.error("Save failed", err);
      setStatusMessage("⚠️ Server error occurred.");
    } finally {
      setShowStatusModal(true);
      setTimeout(() => setShowStatusModal(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 rounded-full border-4 border-emerald-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Lead not found</h2>
        <p className="text-slate-500">No data available for phone: {phone}</p>
        <Button onClick={() => navigate(-1)} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Lead Details</h1>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="lead">Lead Info</TabsTrigger>
            <TabsTrigger value="ocr">OCR Data</TabsTrigger>
          </TabsList>

          <TabsContent value="lead">
            <Card>
              <CardHeader>
                <CardTitle className="text-slate-800">Full Details</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {Object.entries(lead).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <div className="font-semibold capitalize text-slate-700">
                      {key.replace(/_/g, " ")}
                    </div>
                    <div className="text-slate-900">
                      {typeof value === "boolean"
                        ? value.toString()
                        : value || "-"}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ocr">
            <Card>
              <CardHeader>
                <CardTitle className="text-slate-800">Aadhaar OCR Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  {Object.entries(ocrData).map(([key, value]) => (
                    <div key={key} className="relative text-sm">
                      <div className="font-semibold capitalize text-slate-700 mb-1">
                        {key.replace(/_/g, " ")}
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          value={value}
                          onChange={(e) =>
                            handleOcrChange(key, e.target.value)
                          }
                          className="w-full pr-8"
                        />
                        <button
                          onClick={() => {
                            const updated = { ...ocrData };
                            delete updated[key];
                            setOcrData(updated);
                          }}
                          className="text-red-500 hover:text-red-700"
                          title="Delete field"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-.867 12.142A2 2 0 0 1 16.138 20H7.862a2 2 0 0 1-1.995-1.858L5 6m5 0V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <Button
                    size="sm"
                    onClick={() => setShowAddFieldModal(true)}
                    className="sm:w-auto w-full"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Field
                  </Button>

                  <Button
                    onClick={() => setShowConfirmModal(true)}
                    className="sm:w-auto w-full"
                  >
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Field Dialog */}
      <Dialog open={showAddFieldModal} onOpenChange={setShowAddFieldModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Field</DialogTitle>
            <DialogDescription>
              Enter the field name and value to add.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Field Name (e.g. nominee_name)"
              value={newFieldKey}
              onChange={(e) => setNewFieldKey(e.target.value)}
            />
            <Input
              placeholder="Field Value"
              value={newFieldValue}
              onChange={(e) => setNewFieldValue(e.target.value)}
            />
          </div>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0">
            <Button
              variant="outline"
              onClick={() => {
                setShowAddFieldModal(false);
                setNewFieldKey("");
                setNewFieldValue("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddNewField}>Add Field</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Save Confirmation Dialog */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Save</DialogTitle>
            <DialogDescription>
              Are you sure you want to save the updated OCR data?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0">
            <Button variant="outline" onClick={() => setShowConfirmModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowConfirmModal(false);
                saveOcrData();
              }}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Dialog */}
      <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Status</DialogTitle>
            <DialogDescription>{statusMessage}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
