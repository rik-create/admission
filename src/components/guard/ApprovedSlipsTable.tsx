// src/components/guard/ApprovedSlipsTable.tsx
import { ArrowRightIcon } from '@radix-ui/react-icons'

interface Slip {
  id: string
  studentName: string
  studentId: string
  reason: string
  validFrom: string
  validTo: string
}

export function ApprovedSlipsTable({ data, onRowClick }: { 
  data: Slip[]
  onRowClick: (id: string) => void 
}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left">Student</th>
            <th className="px-6 py-3 text-left">Reason</th>
            <th className="px-6 py-3 text-left">Valid Period</th>
            <th className="px-6 py-3 text-right"></th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {data.map((slip) => (
            <tr 
              key={slip.id} 
              className="hover:bg-gray-50 cursor-pointer"
              onClick={() => onRowClick(slip.id)}
            >
              <td className="px-6 py-4">
                <div className="font-medium">{slip.studentName}</div>
                <div className="text-sm text-gray-500">{slip.studentId}</div>
              </td>
              <td className="px-6 py-4">{slip.reason}</td>
              <td className="px-6 py-4">
                {new Date(slip.validFrom).toLocaleTimeString()} - {' '}
                {new Date(slip.validTo).toLocaleTimeString()}
              </td>
              <td className="px-6 py-4 text-right">
                <ArrowRightIcon className="h-4 w-4 text-gray-400" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}