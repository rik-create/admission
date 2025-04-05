// components/admin/SlipRequests/SlipRequestsTable.tsx
'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { StatusBadge } from '../StatusBadge'
import { Button } from '@/components/ui/button'
import { SlipDetailsDialog } from './SlipDetailsDialog'
import { SlipRequest } from '@/types/modules/admin'

interface SlipRequestsTableProps {
  requests: SlipRequest[]
  selectedRequests: string[]
  onSelectRequests: (ids: string[]) => void
}

export  function SlipRequestsTable({ 
  requests, 
  selectedRequests, 
  onSelectRequests 
}: SlipRequestsTableProps) {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<SlipRequest | null>(null)

  const handleSelectAll = (checked: boolean) => {
    onSelectRequests(checked ? requests.map(req => req.id) : [])
  }

  const handleSelectRequest = (id: string, checked: boolean) => {
    onSelectRequests(
      checked
        ? [...selectedRequests, id]
        : selectedRequests.filter(reqId => reqId !== id)
    )
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]">
              <Checkbox
                checked={selectedRequests.length === requests.length && requests.length > 0}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead>Student Name</TableHead>
            <TableHead>Request Date</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRequests.includes(request.id)}
                  onCheckedChange={(checked: boolean) => 
                    handleSelectRequest(request.id, checked)}
                />
              </TableCell>
              <TableCell>{request.studentName}</TableCell>
              <TableCell>
                {new Date(request.requestDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {request.reason}
              </TableCell>
              <TableCell>
                <StatusBadge status={request.status} />
              </TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedRequest(request)
                    setOpenDialog(true)
                  }}
                >
                  Review
                </Button>
                <Button variant="default" size="sm">
                  Approve
                </Button>
                <Button variant="destructive" size="sm">
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedRequest && (
        <SlipDetailsDialog
          open={openDialog}
          onOpenChange={setOpenDialog}
          request={selectedRequest}
        />
      )}
    </>
  )
}