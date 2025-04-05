// src/components/student/RequestsTable.tsx
'use client'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileTextIcon } from "@radix-ui/react-icons"

interface Request {
  id: string
  type: string
  date: string
  status: 'approved' | 'pending' | 'rejected'
}

interface RequestsTableProps {
  requests: Request[]
}

export function RequestsTable({ requests }: RequestsTableProps) {
  const statusStyles = {
    approved: 'bg-green-100 text-green-800 border-green-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    rejected: 'bg-blue-100 text-blue-800 border-blue-200'
  }

  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader>
        <CardTitle className="text-black">Past Requests</CardTitle>
      </CardHeader>
      <CardContent>
        {requests.length > 0 ? (
          <Table>
            <TableBody>
              {requests.slice(0, 3).map(request => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium text-black">
                    {request.type} - {request.date}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className={`${statusStyles[request.status]}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center h-32 text-black">
            <FileTextIcon className="h-8 w-8 text-gray-400" />
            <p>No past requests</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}