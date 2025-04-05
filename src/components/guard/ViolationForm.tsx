// src/components/guard/ViolationForm.tsx
'use client'

import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ViolationTypeSelect } from '@/components/guard/ViolationTypeSelect'
import { CalendarIcon, ClockIcon } from '@radix-ui/react-icons'
import { ViolationType } from '@/types/shared/enums'

export type ViolationFormData = {
  type: ViolationType
  description: string
  date: string
  time: string
  studentId?: string
}

interface ViolationFormProps {
  studentId: string
  onCancel: () => void
  onSubmit: (data: ViolationFormData) => void
  isSubmitting?: boolean
}

export function ViolationForm({
  studentId,
  onCancel,
  onSubmit,
  isSubmitting = false
}: ViolationFormProps) {
  const { register, handleSubmit, control, formState } = useForm<ViolationFormData>({
    defaultValues: {
      type: ViolationType.LATE,
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      studentId
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register('studentId')} />

      <div>
        <label className="block text-sm font-medium mb-1">Violation Type</label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <ViolationTypeSelect
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <Textarea
          {...register('description', { required: 'Description is required' })}
          placeholder="Enter violation details"
          disabled={isSubmitting}
        />
        {formState.errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {formState.errors.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            Date
          </label>
          <Input 
            type="date" 
            {...register('date')}
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 flex items-center gap-1">
            <ClockIcon className="h-4 w-4" />
            Time
          </label>
          <Input 
            type="time" 
            {...register('time')}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="flex-1"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </span>
          ) : (
            'Submit Violation'
          )}
        </Button>
      </div>
    </form>
  )
}