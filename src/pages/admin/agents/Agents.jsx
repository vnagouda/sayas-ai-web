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
import { UserPlus, Settings, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";

export default function Agents() {
  const [agents, setAgents] = useState([
    { 
      id: 1, 
      name: 'John Doe', 
      email: 'john@example.com',
      active: true,
      dailyCap: 10,
      currentLeads: 5,
      completedToday: 3
    },
    // Add more sample agents
  ]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAgent, setNewAgent] = useState({
    name: '',
    email: '',
    dailyCap: 10
  });
  const [autoAssign, setAutoAssign] = useState({
    enabled: false,
    mode: 'round-robin' // or 'load-based'
  });

  const handleAddAgent = () => {
    if (newAgent.name && newAgent.email) {
      setAgents([
        ...agents,
        {
          id: agents.length + 1,
          ...newAgent,
          active: true,
          currentLeads: 0,
          completedToday: 0
        }
      ]);
      setNewAgent({ name: '', email: '', dailyCap: 10 });
      setDialogOpen(false);
    }
  };

  const toggleAgentStatus = (id) => {
    setAgents(agents.map(a =>
      a.id === id ? { ...a, active: !a.active } : a
    ));
  };

  const updateDailyCap = (id, newCap) => {
    setAgents(agents.map(a =>
      a.id === id ? { ...a, dailyCap: parseInt(newCap) } : a
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Agents Management</h1>
        <div className="flex gap-2">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Add Agent
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Agent</DialogTitle>
                <DialogDescription>
                  Create a new agent account with their details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={newAgent.name}
                    onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })}
                    placeholder="Agent name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={newAgent.email}
                    onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })}
                    placeholder="agent@example.com"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Daily Lead Cap</label>
                  <Input
                    type="number"
                    value={newAgent.dailyCap}
                    onChange={(e) => setNewAgent({ ...newAgent, dailyCap: e.target.value })}
                    min="1"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddAgent}>Add Agent</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Auto-Assign Settings
          </Button>
        </div>
      </div>

      {/* Auto-assign Alert */}
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Auto-Assignment Status</AlertTitle>
        <AlertDescription className="flex items-center gap-4">
          <span>Round-robin auto-assignment is currently disabled</span>
          <Switch
            checked={autoAssign.enabled}
            onCheckedChange={(checked) => setAutoAssign({ ...autoAssign, enabled: checked })}
          />
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Manage Agents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Daily Cap</TableHead>
                <TableHead>Current Leads</TableHead>
                <TableHead>Completed Today</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell>{agent.name}</TableCell>
                  <TableCell>{agent.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={agent.active}
                        onCheckedChange={() => toggleAgentStatus(agent.id)}
                      />
                      <span className={agent.active ? 'text-green-600' : 'text-gray-500'}>
                        {agent.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={agent.dailyCap}
                      onChange={(e) => updateDailyCap(agent.id, e.target.value)}
                      className="w-20"
                      min="1"
                    />
                  </TableCell>
                  <TableCell>{agent.currentLeads}</TableCell>
                  <TableCell>{agent.completedToday}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Reset Password</Button>
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
