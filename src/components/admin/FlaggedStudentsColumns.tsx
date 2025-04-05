// src/components/admin/FlaggedStudentsColumns.tsx
import { ColumnDef } from '@tanstack/react-table'
import { FlaggedStudent } from '@/types/modules/admin'

export const columns: ColumnDef<FlaggedStudent>[] = [
  {
    accessorKey: 'student.id',
    header: 'Student ID',
  },
  {
    accessorKey: 'student.name',
    header: 'Student Name',
    cell: ({ row }) => {
      const student = row.original.student
      return (
        <div className="flex items-center">
          <span className="font-medium">{student.name}</span>
          {student.studentId && (
            <span className="ml-2 text-sm text-gray-500">({student.studentId})</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
  },
  {
    accessorKey: 'actionRequired',
    header: 'Action Required',
    cell: ({ row }) => {
      const actionRequired = row.getValue('actionRequired')
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${
          actionRequired ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {actionRequired ? 'Yes' : 'No'}
        </span>
      )
    },
  },
]