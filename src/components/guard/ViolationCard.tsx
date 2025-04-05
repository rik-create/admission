// src/components/guard/ViolationCard.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { GuardViolation } from '@/types/modules/guard'
import { format } from 'date-fns'
import { StatusBadge } from '../shared/StatusBadge'

interface ViolationCardProps {
  violation: GuardViolation
  className?: string
}

export function ViolationCard({ violation, className }: ViolationCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Violation #{violation.id}</span>
          <StatusBadge status={violation.status} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Student</h3>
          <p>{violation.studentName} ({violation.studentId})</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
          <p className="capitalize">{violation.type.replace('_', ' ')}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
          <p>{format(new Date(violation.date), 'PPPp')}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
          <p>{violation.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Reported By</h3>
          <p>{violation.guardName} ({violation.guardId})</p>
        </div>
      </CardContent>
    </Card>
  )
}