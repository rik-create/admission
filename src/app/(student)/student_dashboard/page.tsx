// src/app/(student)/student_dashboard/page.tsx
'use client'
// Corrected imports
import { SlipCard } from "../../../components/student/SlipCard"
import { ViolationCard } from "../../../components/student/ViolationCard"
import { RequestsTable } from "../../../components/student/RequestsTable"

export default function StudentDashboard() {
  // Mock data - replace with real API calls
  const activeSlip = {
    status: 'approved' as const,
    expiryDate: '2023-12-31',
    approvalDate: '2023-09-01',
    validUntil: '2023-12-31',
    reason: 'Medical leave'
  }

  const violations = [
    { id: '1', title: 'Late submission', date: '2023-08-15' }
  ]

  const pastRequests = [
    { id: '1', type: 'Leave Request', date: '2023-07-10', status: 'approved' as const },
    { id: '2', type: 'Field Trip', date: '2023-06-05', status: 'rejected' as const },
    { id: '3', type: 'Early Dismissal', date: '2023-05-20', status: 'approved' as const }
  ]

  return (
    <div className="grid gap-6 p-4">
      {/* Active Slip */}
      <SlipCard slip={activeSlip} />
      
      {/* Violation Count */}
      <ViolationCard violations={violations} />
      
      {/* Past Requests */}
      <RequestsTable requests={pastRequests} />
    </div>
  )
}