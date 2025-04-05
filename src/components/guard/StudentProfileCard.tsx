// src/components/guard/StudentProfileCard.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { 
  IdCardIcon,
  PersonIcon, 
  CalendarIcon,
  ClockIcon,
  CheckCircledIcon,
  CrossCircledIcon
} from '@radix-ui/react-icons'
import { cn } from '@/lib/utils'

interface StudentProfileCardProps {
  student: {
    id: string
    name: string
    studentId: string
    yearLevel?: string
    section?: string
    avatar?: string
    slipStatus?: 'expired' | 'none' | 'approved' | 'pending' | 'active'
    lastViolation?: string
  }
  className?: string
  onViewViolations?: () => void
  onLogViolation?: () => void
  size?: 'sm' | 'md' | 'lg' // New size prop
}

export function StudentProfileCard({
  student,
  className = '',
  onViewViolations,
  onLogViolation,
  size = 'md' // Default size
}: StudentProfileCardProps) {
  if (!student) return null

  // Size-based configurations
  const sizeConfig = {
    sm: {
      avatar: 'h-12 w-12',
      name: 'text-base',
      details: 'text-xs',
      status: 'text-xs',
      button: 'text-xs h-8',
      icon: 'h-3 w-3',
      padding: 'p-4'
    },
    md: {
      avatar: 'h-16 w-16',
      name: 'text-lg',
      details: 'text-sm',
      status: 'text-sm',
      button: 'text-sm h-9',
      icon: 'h-4 w-4',
      padding: 'p-6'
    },
    lg: {
      avatar: 'h-20 w-20',
      name: 'text-xl',
      details: 'text-base',
      status: 'text-base',
      button: 'text-base h-10',
      icon: 'h-5 w-5',
      padding: 'p-8'
    }
  }

  const config = sizeConfig[size]

  return (
    <div className={cn(
      'bg-white rounded-lg shadow-md',
      config.padding,
      className
    )}>
      {/* Student Profile Header */}
      <div className="flex flex-col xs:flex-row items-start xs:items-center gap-4 mb-4 sm:mb-6">
        <Avatar className={cn('flex-shrink-0', config.avatar)}>
          <AvatarImage src={student.avatar} />
          <AvatarFallback>
            {student.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="w-full">
          <h3 className={cn('font-semibold', config.name)}>
            {student.name}
          </h3>
          <p className={cn('text-gray-500 flex items-center gap-1', config.details)}>
            <IdCardIcon className={config.icon} />
            {student.studentId}
          </p>
          {(student.yearLevel || student.section) && (
            <p className={cn('text-gray-500 flex items-center gap-1', config.details)}>
              <PersonIcon className={config.icon} />
              {student.yearLevel && `${student.yearLevel}`}
              {student.yearLevel && student.section && ' - '}
              {student.section && `${student.section}`}
            </p>
          )}
        </div>
      </div>

      {/* Slip Status */}
      {student.slipStatus && (
        <div className={cn(
          'mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg',
          student.slipStatus === 'approved' 
            ? 'bg-green-50 text-green-800' 
            : student.slipStatus === 'pending'
              ? 'bg-yellow-50 text-yellow-800'
              : 'bg-red-50 text-red-800',
          config.status
        )}>
          <div className="flex items-center gap-2">
            {student.slipStatus === 'approved' ? (
              <CheckCircledIcon className={config.icon} />
            ) : (
              <CrossCircledIcon className={config.icon} />
            )}
            <span className="font-medium">
              {student.slipStatus === 'approved' 
                ? 'Active Slip' 
                : student.slipStatus === 'pending'
                  ? 'Pending Approval'
                  : 'No Active Slip'}
            </span>
          </div>
          {student.lastViolation && (
            <p className={cn('mt-2 flex items-center gap-1', config.details)}>
              <ClockIcon className={config.icon} />
              Last violation: {student.lastViolation}
            </p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col xs:flex-row gap-2">
        <Button
          variant="outline"
          className={cn('gap-2', config.button)}
          onClick={onViewViolations}
        >
          <CalendarIcon className={config.icon} />
          View Violations
        </Button>
        <Button
          variant={student.slipStatus === 'approved' ? 'outline' : 'destructive'}
          className={config.button}
          onClick={onLogViolation}
        >
          Log Violation
        </Button>
      </div>
    </div>
  )
}