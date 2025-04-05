// src/app/(guard)/violations/[studentId]/page.tsx
'use client'

import { ViolationType } from '@/types/shared/enums'
import { StudentProfileCard } from '@/components/guard/StudentProfileCard'
import { Button } from '@/components/ui/button'
import { useRouter, useParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SortAsc, SortDesc } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Violation {
  id: string
  date: Date
  type: ViolationType
  description: string
  status: 'pending' | 'resolved'
}

interface Student {
  id: string
  name: string
  studentId: string
  yearLevel: string
  section: string
  avatar?: string
  slipStatus?: 'expired' | 'none' | 'approved' | 'pending' | 'active'
  lastViolation?: string
  violations: Violation[]
}

export default function ViolationsPage() {
  const router = useRouter()
  const params = useParams<{ studentId: string }>()
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'resolved'>('all')
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest')
  const [violations, setViolations] = useState<Violation[]>([])

  // Mock student data
  const student: Student = {
    id: params.studentId || '123',
    name: 'Alex Johnson',
    studentId: 'STU-2023-0456',
    yearLevel: 'Grade 11',
    section: 'STEM-A',
    avatar: '/avatars/student.png',
    slipStatus: 'approved',
    lastViolation: '2023-10-15 (Late)',
    violations: [
      {
        id: '1',
        date: new Date('2023-10-15'),
        type: ViolationType.LATE,
        description: 'Arrived 15 minutes late',
        status: 'resolved'
      },
      {
        id: '2',
        date: new Date('2023-11-02'),
        type: ViolationType.DRESS_CODE,
        description: 'Incorrect uniform',
        status: 'pending'
      }
    ]
  }

  const handleNewViolation = () => {
    router.push(`/(guard)/violations/new?studentId=${student.id}`)
  }

  const handleResolve = async (violationId: string) => {
    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setViolations(prev =>
        prev.map(v =>
          v.id === violationId ? { ...v, status: 'resolved' } : v
        )
      )
      toast.success('Violation resolved successfully')
    } catch (error) {
      toast.error('Failed to resolve violation')
    }
  }

  const filteredViolations = student.violations.filter(violation => 
    filterStatus === 'all' || violation.status === filterStatus
  )

  const sortedViolations = [...filteredViolations].sort((a, b) => 
    sortOrder === 'newest' 
      ? b.date.getTime() - a.date.getTime() 
      : a.date.getTime() - b.date.getTime()
  )

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Violation History</h1>
        <div className="flex gap-2">
   
          <Button variant="outline" onClick={() => router.back()}>
            Back
          </Button>
        </div>
      </div>

      {/* Simplified StudentProfileCard without action buttons */}
      <div className="bg-white rounded-lg shadow-md p-6 border">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
            {student.avatar ? (
              <img 
                src={student.avatar} 
                className="h-full w-full rounded-full object-cover"
                alt={student.name}
              />
            ) : (
              <span className="text-lg font-semibold">
                {student.name.charAt(0)}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{student.name}</h3>
            <p className="text-sm text-gray-500">
              {student.studentId}
            </p>
            <p className="text-sm text-gray-500">
              {student.yearLevel} - {student.section}
            </p>
          </div>
        </div>
        {student.slipStatus && (
          <div className={`mt-4 p-3 rounded-lg ${
            student.slipStatus === 'approved' 
              ? 'bg-green-50 text-green-800' 
              : student.slipStatus === 'pending'
                ? 'bg-yellow-50 text-yellow-800'
                : 'bg-red-50 text-red-800'
          }`}>
            <span className="font-medium">
              {student.slipStatus === 'approved' 
                ? 'Active Slip' 
                : student.slipStatus === 'pending'
                  ? 'Pending Approval'
                  : 'No Active Slip'}
            </span>
            {student.lastViolation && (
              <p className="text-sm mt-1">
                Last violation: {student.lastViolation}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Select 
          value={filterStatus}
          onValueChange={(value: 'all' | 'pending' | 'resolved') => setFilterStatus(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
        >
          {sortOrder === 'newest' ? (
            <SortDesc className="mr-2 h-4 w-4" />
          ) : (
            <SortAsc className="mr-2 h-4 w-4" />
          )}
          {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}
        </Button>
      </div>

      <div className="space-y-4">
        {sortedViolations.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No violations found
          </div>
        ) : (
          sortedViolations.map(violation => (
            <div
              key={violation.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">
                    {violation.type} -{' '}
                    {violation.date.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {violation.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={violation.status === 'pending' ? 'destructive' : 'default'}
                  >
                    {violation.status}
                  </Badge>
                  {violation.status === 'pending' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleResolve(violation.id)}
                    >
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}