// src/components/shared/StatusBadge.tsx
'use client'

import { cn } from '@/lib/utils'
import { ViolationStatus } from '@/types/shared/enums'

// src/components/shared/StatusBadge.tsx
type Status = 'pending' | 'approved' | 'rejected' | ViolationStatus // Combine both types

interface StatusBadgeProps {
  status: Status
  className?: string
}

const statusColors = {
  [ViolationStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
  [ViolationStatus.APPROVED]: 'bg-green-100 text-green-800',
  [ViolationStatus.REJECTED]: 'bg-red-100 text-red-800'
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        statusColors[status],
        className
      )}
    >
      {status}
    </span>
  )
}