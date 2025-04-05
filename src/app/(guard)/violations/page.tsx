// src/app/(guard)/violations/page.tsx
'use client'

import { ViolationTable } from '@/components/guard/ViolationTable'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { GuardViolation } from '@/types/modules/guard'
import { ViolationStatus, ViolationType } from '@/types/shared/enums'

export default function ViolationsPage() {
  const router = useRouter()
  
  const violations: GuardViolation[] = [
    {
      id: '1',
      studentId: 'STU-2023-0456',
      studentName: 'Alex Johnson',
      type: ViolationType.LATE,
      date: new Date('2023-10-15'),
      status: ViolationStatus.APPROVED,
      description: 'Arrived 15 minutes late',
      guardId: 'G-2023-001',
      guardName: 'Officer Smith'
    }
  ]

  const handleRowClick = (id: string) => {
    router.push(`violations/${id}`)
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Violation Records</h1>
        <Button onClick={() => router.push('violations/new')}>
          Log New Violation
        </Button>
      </div>
      
      <ViolationTable 
        data={violations} 
        onRowClick={handleRowClick}
      />
    </div>
  )
}