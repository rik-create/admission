// app/(admin)/slip-requests/page.tsx
'use client'

import { useState } from 'react'
import { SlipRequestsTable } from '@/components/admin/SlipRequests/SlipRequestsTable'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SlipRequest } from '@/types/modules/admin'

export default function SlipRequestsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedRequests, setSelectedRequests] = useState<string[]>([])

  // Properly typed mock data
  const slipRequests: SlipRequest[] = [
    {
      id: '1',
      studentName: 'Alex Johnson',
      studentId: 'STU-2023-0456',
      requestDate: '2023-10-15',
      reason: 'Medical appointment with doctor',
      status: 'pending' as const // Explicitly typed as const
    },
    {
      id: '2',
      studentName: 'Maria Garcia',
      studentId: 'STU-2023-0789',
      requestDate: '2023-10-16',
      reason: 'Family emergency',
      status: 'approved' as const
    },
    {
      id: '3',
      studentName: 'James Wilson',
      studentId: 'STU-2023-0923',
      requestDate: '2023-10-17',
      reason: 'Dental checkup',
      status: 'rejected' as const
    }
  ]

  const filteredRequests = statusFilter === 'all' 
    ? slipRequests 
    : slipRequests.filter(req => req.status === statusFilter)

  const handleBulkApprove = () => {
    console.log('Approving:', selectedRequests)
    // API call would go here
  }

  const handleBulkReject = () => {
    console.log('Rejecting:', selectedRequests)
    // API call would go here
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Slip Requests Management</h1>
      
      {/* Actions Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Requests</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            disabled={selectedRequests.length === 0}
            onClick={handleBulkApprove}
          >
            Bulk Approve
          </Button>
          <Button 
            variant="outline" 
            disabled={selectedRequests.length === 0}
            onClick={handleBulkReject}
          >
            Bulk Reject
          </Button>
        </div>
      </div>

      {/* Requests Table */}
      <SlipRequestsTable 
        requests={filteredRequests} 
        selectedRequests={selectedRequests}
        onSelectRequests={setSelectedRequests}
      />
    </div>
  )
}