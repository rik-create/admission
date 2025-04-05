// src/components/guard/ViolationTypeSelect.tsx
'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ViolationType } from '@/types/shared/enums'

interface ViolationTypeSelectProps {
  value: ViolationType
  onChange: (value: ViolationType) => void
}

export function ViolationTypeSelect({ value, onChange }: ViolationTypeSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select violation type" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(ViolationType).map((type) => (
          <SelectItem key={type} value={type}>
            {type.replace('_', ' ')}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}