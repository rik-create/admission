// src/app/(guard)/search/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ManualEntryForm } from '@/components/guard/ManualEntryForm'
import { StudentProfileCard } from '@/components/guard/StudentProfileCard'

interface Student {
  id: string
  name: string
  studentId: string
  yearLevel: string
  section: string
  avatar?: string
  slipStatus: 'approved' | 'pending' | 'expired' | 'none'
  lastViolation?: string
}

export default function SearchPage() {
  const router = useRouter()
  const [student, setStudent] = useState<Student | null>(null)

  const handleSearch = async (studentId: string) => {
    try {
      // Mock API call - replace with actual implementation
      const mockStudent: Student = {
        id: '123',
        name: 'Alex Johnson',
        studentId: 'STU-2023-0456',
        yearLevel: 'Grade 11',
        section: 'STEM-A',
        avatar: '/avatars/student.png',
        slipStatus: 'approved',
        lastViolation: '2023-10-15 (Late)'
      }
      setStudent(mockStudent)
    } catch (error) {
      console.error('Search failed:', error)
    }
  }

  const handleViewViolations = (studentId: string) => {
    router.push(`violations/${studentId}`)
  }

  const handleLogViolation = (studentId: string) => {
    router.push(`violations/new?studentId=${studentId}`)
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Student Search</h1>
      <ManualEntryForm onSearch={handleSearch} />
      
      {student && (
        <StudentProfileCard
          student={student}
          className="mt-6"
          onViewViolations={() => handleViewViolations(student.id)}
          onLogViolation={() => handleLogViolation(student.id)}
        />
      )}
    </div>
  )
}