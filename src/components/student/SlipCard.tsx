// src/components/student/SlipCard.tsx
'use client'
import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  FileTextIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@radix-ui/react-icons"

interface Slip {
  status: 'approved' | 'pending' | 'rejected'
  expiryDate: string
  approvalDate?: string
  validUntil?: string
  reason?: string
}

interface SlipCardProps {
  slip: Slip | null
}

export function SlipCard({ slip }: SlipCardProps) {
  const [expanded, setExpanded] = useState(false)
  
  const statusStyles = {
    approved: 'bg-green-100 text-green-800 border-green-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    rejected: 'bg-blue-100 text-blue-800 border-blue-200'
  }

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-black">Active Slip</CardTitle>
          {slip && (
            <Badge className={`${statusStyles[slip.status]}`}>
              {slip.status.charAt(0).toUpperCase() + slip.status.slice(1)}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {slip ? (
          <>
            <p className="text-black">Expires: {slip.expiryDate}</p>
            <Button
              variant="ghost"
              className="flex items-center mt-2 text-sm text-blue-500 p-0"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? (
                <>
                  Hide details <ChevronUpIcon className="ml-1 h-4 w-4" />
                </>
              ) : (
                <>
                  Show details <ChevronDownIcon className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
            {expanded && (
              <div className="mt-2 space-y-1 text-black">
                {slip.approvalDate && <p>Approval Date: {slip.approvalDate}</p>}
                {slip.validUntil && <p>Valid Until: {slip.validUntil}</p>}
                {slip.reason && <p>Reason: {slip.reason}</p>}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-black">
            <FileTextIcon className="h-8 w-8 text-gray-400" />
            <p>No active slip</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}