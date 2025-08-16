import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MoreVertical, Search, Trash, Edit, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export default function LeadsManagement({ leads, onUpdate, onDelete, onBulkAction }) {
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editLead, setEditLead] = useState(null);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ field: "timestamp", direction: "desc" });

  const handleSort = (field) => {
    setSort({
      field,
      direction: sort.field === field && sort.direction === "asc" ? "desc" : "asc",
    });
  };

  const filteredLeads = leads
    .filter((lead) => {
      const searchRegex = new RegExp(searchTerm, "i");
      return (
        searchRegex.test(lead.name) ||
        searchRegex.test(lead.phone_number) ||
        searchRegex.test(lead.aadhaar_number) ||
        searchRegex.test(lead.status)
      );
    })
    .sort((a, b) => {
      const direction = sort.direction === "asc" ? 1 : -1;
      if (a[sort.field] < b[sort.field]) return -1 * direction;
      if (a[sort.field] > b[sort.field]) return 1 * direction;
      return 0;
    });

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLeads(filteredLeads.map((lead) => lead._id));
    } else {
      setSelectedLeads([]);
    }
  };

  const handleSelect = (id) => {
    if (selectedLeads.includes(id)) {
      setSelectedLeads(selectedLeads.filter((leadId) => leadId !== id));
    } else {
      setSelectedLeads([...selectedLeads, id]);
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Delete ${selectedLeads.length} selected leads?`)) {
      onBulkAction(selectedLeads, 'delete');
      setSelectedLeads([]);
    }
  };

  const handleEdit = (lead) => {
    setEditLead({ ...lead });
  };

  const handleUpdateLead = async () => {
    await onUpdate(editLead._id, editLead);
    setEditLead(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
        {selectedLeads.length > 0 && (
          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={handleBulkDelete}
              className="flex items-center gap-2"
            >
              <Trash className="w-4 h-4" />
              Delete Selected ({selectedLeads.length})
            </Button>
          </div>
        )}
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedLeads.length === filteredLeads.length &&
                    filteredLeads.length > 0
                  }
                />
              </TableHead>
              <TableHead onClick={() => handleSort("name")}>Name</TableHead>
              <TableHead onClick={() => handleSort("phone_number")}>Phone</TableHead>
              <TableHead onClick={() => handleSort("aadhaar_number")}>Aadhaar</TableHead>
              <TableHead onClick={() => handleSort("status")}>Status</TableHead>
              <TableHead onClick={() => handleSort("timestamp")}>Date</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow key={lead._id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedLeads.includes(lead._id)}
                    onChange={() => handleSelect(lead._id)}
                  />
                </TableCell>
                <TableCell>{lead.name}</TableCell>
                <TableCell>{lead.phone_number}</TableCell>
                <TableCell>{lead.aadhaar_number}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      lead.status === "complete"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {lead.status}
                  </span>
                </TableCell>
                <TableCell>
                  {new Date(lead.timestamp).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Lead</DialogTitle>
                          </DialogHeader>
                          {editLead && (
                            <div className="space-y-4">
                              <Input
                                label="Name"
                                value={editLead.name}
                                onChange={(e) =>
                                  setEditLead({ ...editLead, name: e.target.value })
                                }
                              />
                              <Input
                                label="Phone"
                                value={editLead.phone_number}
                                onChange={(e) =>
                                  setEditLead({
                                    ...editLead,
                                    phone_number: e.target.value,
                                  })
                                }
                              />
                              <Input
                                label="Aadhaar"
                                value={editLead.aadhaar_number}
                                onChange={(e) =>
                                  setEditLead({
                                    ...editLead,
                                    aadhaar_number: e.target.value,
                                  })
                                }
                              />
                              <Button onClick={handleUpdateLead}>
                                <Check className="mr-2 h-4 w-4" />
                                Save Changes
                              </Button>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => onDelete(lead._id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
