// components/admin/SlipRequests/SlipDetailsDialog.tsx
'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { StatusBadge } from '../StatusBadge'
import { CalendarIcon, IdCardIcon } from '@radix-ui/react-icons'
import { SlipRequest } from '@/types/modules/admin'

interface SlipDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  request: SlipRequest
}

export function SlipDetailsDialog({ open, onOpenChange, request }: SlipDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Slip Request Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Student Information */}
          <div className="space-y-2">
            <h3 className="font-medium">Student Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Name:</span>
                <span>{request.studentName}</span>
              </div>
              <div className="flex items-center gap-2">
                <IdCardIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">ID:</span>
                <span>{request.studentId}</span>
              </div>
            </div>
            <Button variant="link" className="pl-0">
              View Violation History
            </Button>
          </div>

          {/* Request Details */}
          <div className="space-y-2">
            <h3 className="font-medium">Request Details</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Request Date:</span>
                <span>
                  {new Date(request.requestDate).toLocaleDateString()}
                </span>
              </div>
              <div>
                <p className="text-muted-foreground">Reason:</p>
                <p className="mt-1">{request.reason}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Status:</span>
                <StatusBadge status={request.status} />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="destructive">Reject</Button>
          <Button variant="default">Approve</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}