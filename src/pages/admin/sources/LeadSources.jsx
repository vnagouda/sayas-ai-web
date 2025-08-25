import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
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
import { Switch } from "../../../components/ui/switch";
import { PlusCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

export default function LeadSources() {
  const [sources, setSources] = useState([
    { id: 1, name: 'Website Form', active: true },
    { id: 2, name: 'Facebook Ads', active: true },
    { id: 3, name: 'Google Ads', active: false },
    { id: 4, name: 'Referral Program', active: true },
  ]);
  const [newSource, setNewSource] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSource, setEditingSource] = useState(null);

  const handleAdd = () => {
    if (newSource.trim() && !sources.find(s => s.name.toLowerCase() === newSource.toLowerCase())) {
      setSources([
        ...sources,
        { id: sources.length + 1, name: newSource, active: true }
      ]);
      setNewSource('');
      setDialogOpen(false);
    }
  };

  const handleEdit = () => {
    if (editingSource && editingSource.name.trim()) {
      setSources(sources.map(s => 
        s.id === editingSource.id 
          ? { ...s, name: editingSource.name }
          : s
      ));
      setEditingSource(null);
      setDialogOpen(false);
    }
  };

  const toggleActive = (id) => {
    setSources(sources.map(s =>
      s.id === id ? { ...s, active: !s.active } : s
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lead Sources</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Source
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingSource ? 'Edit Source' : 'Add New Source'}
              </DialogTitle>
              <DialogDescription>
                {editingSource 
                  ? 'Edit the lead source name below.'
                  : 'Enter a unique name for the new lead source.'}
              </DialogDescription>
            </DialogHeader>
            <Input
              placeholder="Source name"
              value={editingSource ? editingSource.name : newSource}
              onChange={(e) => 
                editingSource 
                  ? setEditingSource({ ...editingSource, name: e.target.value })
                  : setNewSource(e.target.value)
              }
            />
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setDialogOpen(false);
                setEditingSource(null);
                setNewSource('');
              }}>
                Cancel
              </Button>
              <Button onClick={editingSource ? handleEdit : handleAdd}>
                {editingSource ? 'Save Changes' : 'Add Source'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sources.map((source) => (
                <TableRow key={source.id}>
                  <TableCell>{source.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={source.active}
                        onCheckedChange={() => toggleActive(source.id)}
                      />
                      <span className={source.active ? 'text-green-600' : 'text-gray-500'}>
                        {source.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setEditingSource(source);
                        setDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
