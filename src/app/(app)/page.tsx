'use client'

import { useState } from 'react'
import { Plus, Settings, Users, MoreVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function WhatsAppRedirectorDashboard() {
  const [redirectors, setRedirectors] = useState([
    { id: 1, name: 'Sales Team', url: 'https://chat.whatsapp.com/sales123' },
    {
      id: 2,
      name: 'Support Group',
      url: 'https://chat.whatsapp.com/support456',
    },
  ])

  const [newRedirector, setNewRedirector] = useState({ name: '', url: '' })

  const handleAddRedirector = () => {
    if (newRedirector.name && newRedirector.url) {
      setRedirectors([...redirectors, { id: Date.now(), ...newRedirector }])
      setNewRedirector({ name: '', url: '' })
    }
  }

  const handleDeleteRedirector = (id: number) => {
    setRedirectors(redirectors.filter((r) => r.id !== id))
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      <h2 className="text-3xl font-bold mb-6">WhatsApp Redirector Dashboard</h2>

      {/* Existing Redirectors */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Existing Redirectors</h3>
        <div className="space-y-4">
          {redirectors.map((redirector) => (
            <div
              key={redirector.id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded"
            >
              <div>
                <h4 className="font-semibold">{redirector.name}</h4>
                <p className="text-sm text-gray-500">{redirector.url}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleDeleteRedirector(redirector.id)}
                    className="text-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>

      {/* Create New Redirector */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Create New Redirector</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={newRedirector.name}
              onChange={(e) =>
                setNewRedirector({ ...newRedirector, name: e.target.value })
              }
              placeholder="Enter redirector name"
            />
          </div>
          <div>
            <Label htmlFor="url">WhatsApp URL</Label>
            <Input
              id="url"
              value={newRedirector.url}
              onChange={(e) =>
                setNewRedirector({ ...newRedirector, url: e.target.value })
              }
              placeholder="Enter WhatsApp group URL"
            />
          </div>
          <Button onClick={handleAddRedirector}>
            <Plus className="mr-2 h-4 w-4" /> Add Redirector
          </Button>
        </div>
      </div>

      {/* Configure Redirect */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Configure Redirect</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="redirect-url">Redirect URL</Label>
            <Input id="redirect-url" placeholder="Enter custom redirect URL" />
          </div>
          <div>
            <Label htmlFor="redirect-message">Redirect Message</Label>
            <Textarea
              id="redirect-message"
              placeholder="Enter custom redirect message"
            />
          </div>
          <Button>
            <Settings className="mr-2 h-4 w-4" /> Save Configuration
          </Button>
        </div>
      </div>

      {/* Manage Groups */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Manage Groups</h3>
        <div className="space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Users className="mr-2 h-4 w-4" /> Add Group
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Group</DialogTitle>
                <DialogDescription>
                  Enter the details for the new WhatsApp group.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="group-name" className="text-right">
                    Name
                  </Label>
                  <Input id="group-name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="group-url" className="text-right">
                    URL
                  </Label>
                  <Input id="group-url" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add Group</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
