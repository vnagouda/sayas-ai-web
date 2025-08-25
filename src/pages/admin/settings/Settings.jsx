import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
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
import { Button } from "../../../components/ui/button";
import { Settings2, MessageSquare, Webhook } from 'lucide-react';

export default function Settings() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <Tabs defaultValue="pipeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pipeline" className="flex items-center gap-2">
            <Settings2 className="w-4 h-4" />
            Pipeline
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            WhatsApp Templates
          </TabsTrigger>
          <TabsTrigger value="webhooks" className="flex items-center gap-2">
            <Webhook className="w-4 h-4" />
            Webhooks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline">
          <Card>
            <CardHeader>
              <CardTitle>Pipeline Manager</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Display Name</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Locked</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: 1, name: 'New', displayName: 'New Lead', order: 1, locked: true },
                    { id: 2, name: 'FirstCallDone', displayName: 'First Call Done', order: 2, locked: true },
                    { id: 3, name: 'DocsRequested', displayName: 'Docs Requested', order: 3, locked: false },
                    // Add more statuses
                  ].map((status) => (
                    <TableRow key={status.id}>
                      <TableCell>{status.name}</TableCell>
                      <TableCell>
                        <Input
                          value={status.displayName}
                          disabled={status.locked}
                          className="w-48"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={status.order}
                          disabled={status.locked}
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <Switch checked={status.locked} disabled />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" disabled={status.locked}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>WhatsApp Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: 1, event: 'Docs Request', template: 'docs_request_v1', status: 'Active' },
                    { id: 2, event: 'Docs Received', template: 'docs_received_v1', status: 'Active' },
                    { id: 3, event: 'Payment Received', template: 'payment_confirm_v1', status: 'Pending' },
                    // Add more templates
                  ].map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>{template.event}</TableCell>
                      <TableCell>{template.template}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          template.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {template.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Triggered</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    {
                      id: 1,
                      service: 'Twilio',
                      endpoint: '/webhooks/twilio',
                      status: 'Active',
                      lastTriggered: '2025-08-25 10:30 AM'
                    },
                    {
                      id: 2,
                      service: 'OCR Service',
                      endpoint: '/webhooks/ocr',
                      status: 'Active',
                      lastTriggered: '2025-08-25 09:45 AM'
                    },
                    {
                      id: 3,
                      service: 'Zoho Forms',
                      endpoint: '/webhooks/zoho',
                      status: 'Inactive',
                      lastTriggered: '2025-08-24 03:15 PM'
                    },
                  ].map((webhook) => (
                    <TableRow key={webhook.id}>
                      <TableCell>{webhook.service}</TableCell>
                      <TableCell>{webhook.endpoint}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={webhook.status === 'Active'}
                          />
                          <span className={webhook.status === 'Active' ? 'text-green-600' : 'text-gray-500'}>
                            {webhook.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{webhook.lastTriggered}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Configure</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
