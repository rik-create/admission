// src/components/guard/ManualEntryForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ManualEntryFormProps {
  onSearch: (studentId: string) => Promise<void> | void
}

export function ManualEntryForm({ onSearch }: ManualEntryFormProps) {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: { studentId: '' }
  })

  const onSubmit = async (data: { studentId: string }) => {
    await onSearch(data.studentId)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register('studentId', {
          required: 'Student ID is required',
          pattern: {
            value: /^[A-Z]{3}-\d{4}-\d{4}$/,
            message: 'Invalid student ID format (e.g. STU-2023-0001)'
          }
        })}
        placeholder="Enter Student ID"
      />
      {formState.errors.studentId && (
        <p className="text-red-500 text-sm">
          {formState.errors.studentId.message}
        </p>
      )}
      <Button type="submit" className="w-full">
        Search Student
      </Button>
    </form>
  )
}