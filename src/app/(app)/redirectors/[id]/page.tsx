/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { Trash, Plus, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from '@/hooks/use-toast'

export default function RedirectorConfigPage() {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Sales Team',
      url: 'https://chat.whatsapp.com/sales123',
      maxParticipants: 100,
    },
    {
      id: 2,
      name: 'Support Group',
      url: 'https://chat.whatsapp.com/support456',
      maxParticipants: 200,
    },
  ])

  const [redirectorConfig, setRedirectorConfig] = useState({
    urlEnding: 'sales-support',
    description: 'Redirector for Sales and Support teams',
    redirectMessage:
      "You're being redirected to the appropriate WhatsApp group.",
  })

  const [newGroup, setNewGroup] = useState({
    name: '',
    url: '',
    maxParticipants: '',
  })

  const handleAddGroup = () => {
    if (newGroup.name && newGroup.url && newGroup.maxParticipants) {
      setGroups([...groups, { id: Date.now(), ...newGroup }] as any)
      setNewGroup({ name: '', url: '', maxParticipants: '' })
      toast({
        title: 'Group Added',
        description: 'The new group has been successfully added.',
      })
    }
  }

  const handleDeleteGroup = (id: number) => {
    setGroups(groups.filter((group) => group.id !== id))
    toast({
      title: 'Group Deleted',
      description: 'The group has been successfully removed.',
      variant: 'destructive',
    })
  }

  const handleSaveConfig = () => {
    // In a real application, you would save the configuration to your backend here
    toast({
      title: 'Configuration Saved',
      description: 'The redirector configuration has been updated.',
    })
  }

  const handleDeleteRedirector = () => {
    // In a real application, you would delete the redirector from your backend here
    toast({
      title: 'Redirector Deleted',
      description: 'The redirector has been permanently deleted.',
      variant: 'destructive',
    })
  }

  return (
    <div className="flex-1 p-8 overflow-auto">
      <div className="flex flex-col gap-y-6">
        <h1 className="text-3xl font-bold">Redirector Configuration</h1>

        {/* List Groups */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Groups</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>WhatsApp URL</TableHead>
                <TableHead>Max Participants</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.id}>
                  <TableCell>{group.name}</TableCell>
                  <TableCell>{group.url}</TableCell>
                  <TableCell>{group.maxParticipants}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Are you sure you want to delete this group?
                          </DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. The group will be
                            permanently removed from the redirector.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="outline" onClick={() => {}}>
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleDeleteGroup(group.id)}
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Add Group */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add New Group</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="group-name">Name</Label>
              <Input
                id="group-name"
                value={newGroup.name}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, name: e.target.value })
                }
                placeholder="Enter group name"
              />
            </div>
            <div>
              <Label htmlFor="group-url">WhatsApp Group Link</Label>
              <Input
                id="group-url"
                value={newGroup.url}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, url: e.target.value })
                }
                placeholder="Enter WhatsApp group URL"
              />
            </div>
            <div>
              <Label htmlFor="group-max-participants">
                Max Number of Participants
              </Label>
              <Input
                id="group-max-participants"
                type="number"
                value={newGroup.maxParticipants}
                onChange={(e) =>
                  setNewGroup({ ...newGroup, maxParticipants: e.target.value })
                }
                placeholder="Enter max number of participants"
              />
            </div>
            <Button onClick={handleAddGroup}>
              <Plus className="mr-2 h-4 w-4" /> Add Group
            </Button>
          </div>
        </div>

        {/* Configure Redirector */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Redirector Configuration
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="url-ending">URL Ending</Label>
              <div className="flex items-stretch">
                <span className="bg-gray-100 px-3 h-[40px] flex items-center rounded-l-md border border-r-0 border-gray-300 w-fit whitespace-nowrap">
                  https://your-domain.com/
                </span>
                <Input
                  id="url-ending"
                  value={redirectorConfig.urlEnding}
                  onChange={(e) =>
                    setRedirectorConfig({
                      ...redirectorConfig,
                      urlEnding: e.target.value,
                    })
                  }
                  className="rounded-l-none"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="redirector-description">
                Redirector Description
              </Label>
              <Textarea
                id="redirector-description"
                value={redirectorConfig.description}
                onChange={(e) =>
                  setRedirectorConfig({
                    ...redirectorConfig,
                    description: e.target.value,
                  })
                }
                placeholder="Enter redirector description"
              />
            </div>
            <div>
              <Label htmlFor="redirect-message">Redirect Message</Label>
              <Textarea
                id="redirect-message"
                value={redirectorConfig.redirectMessage}
                onChange={(e) =>
                  setRedirectorConfig({
                    ...redirectorConfig,
                    redirectMessage: e.target.value,
                  })
                }
                placeholder="Enter redirect message"
              />
            </div>
            <Button onClick={handleSaveConfig}>
              <Save className="mr-2 h-4 w-4" /> Save Configuration
            </Button>
          </div>
        </div>

        {/* Delete Redirector */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Delete Redirector</h2>
          <p className="mb-4 text-gray-600">
            Warning: This action cannot be undone. All associated groups and
            configurations will be permanently deleted.
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="destructive">
                <Trash className="mr-2 h-4 w-4" /> Delete Redirector
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete this redirector?
                </DialogTitle>
                <DialogDescription>
                  This action cannot be undone. All associated groups and
                  configurations will be permanently deleted.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => {}}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDeleteRedirector}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
