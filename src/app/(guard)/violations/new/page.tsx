// src/app/(guard)/violations/new/page.tsx
'use client'

import { ViolationForm } from '@/components/guard/ViolationForm'
import { StudentProfileCard } from '@/components/guard/StudentProfileCard'
import { Button } from '@/components/ui/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ViolationType, type SlipStatus } from '@/types/shared/enums'
import { toast } from 'sonner'

interface Student {
  id: string
  name: string
  studentId: string
  yearLevel: string
  section: string
  avatar?: string
  slipStatus: SlipStatus
  lastViolation?: string
  violations: {
    date: Date
    type: ViolationType
    description: string
  }[]
}

export default function NewViolationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const studentId = searchParams.get('studentId')

  // Mock student data with all required fields
  const student: Student = {
    id: studentId || '123',
    name: 'Alex Johnson',
    studentId: 'STU-2023-0456',
    yearLevel: 'Grade 11',
    section: 'STEM-A',
    avatar: '/avatars/student.png',
    slipStatus: 'approved',
    lastViolation: '2023-10-15 (Late)',
    violations: [
      {
        date: new Date('2023-10-15'),
        type: ViolationType.LATE,
        description: 'Arrived 15 minutes late'
      }
    ]
  }

  const handleSubmit = async (data: {
    type: ViolationType
    description: string
  }) => {
    setIsSubmitting(true)
    
    try {
      // In a real app, you would call your API here
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      
      toast.success('Violation recorded successfully')
      router.push(`violations/${student.id}`)
    } catch (error) {
      toast.error('Failed to log violation')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleViewViolations = () => {
    router.push(`/${student.id}`)
  }

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Log New Violation</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleViewViolations}
            disabled={isSubmitting}
          >
            View Violations
          </Button>
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </div>

      <StudentProfileCard 
        student={student}
        className="border rounded-lg p-4"
      />

      <ViolationForm 
        studentId={student.id}
        onSubmit={handleSubmit}
        onCancel={() => router.back()}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}