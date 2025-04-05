// src/components/guard/ViolationTable.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { GuardViolation } from '@/types/modules/guard'

interface ViolationTableProps {
  data: GuardViolation[]
  onRowClick: (id: string) => void
}

export function ViolationTable({ data, onRowClick }: ViolationTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((violation) => (
          <TableRow key={violation.id}>
            <TableCell>{violation.studentName}</TableCell>
            <TableCell>{violation.type}</TableCell>
            <TableCell>{violation.date.toLocaleDateString()}</TableCell>
            <TableCell>
              <StatusBadge status={violation.status} />
            </TableCell>
            <TableCell>
              <button 
                onClick={() => onRowClick(violation.id)}
                className="text-blue-600 hover:underline"
              >
                View
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}