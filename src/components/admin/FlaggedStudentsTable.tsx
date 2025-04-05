// src/components/admin/FlaggedStudentsTable.tsx
'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useRouter } from 'next/navigation'

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[]
  data: TData[]
  onRowClick?: (id: string) => void
}

export function DataTable<TData>({
  columns,
  data,
  onRowClick,
}: DataTableProps<TData>) {
  const router = useRouter()
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            className={`hover:bg-gray-50 ${
              onRowClick ? 'cursor-pointer' : ''
            }`}
            onClick={() => {
              if (onRowClick) {
                // @ts-ignore - assuming id exists in the data
                onRowClick(row.original.id || row.original.student.id)
              }
            }}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="px-4 py-3 whitespace-nowrap text-sm text-gray-900"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}