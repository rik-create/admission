// components/admin/StatusBadge.tsx
import { Badge } from '@/components/ui/badge'
import { SlipRequest } from '@/types/modules/admin'

export function StatusBadge({ status }: { status: SlipRequest['status'] }) {
  const variantMap = {
    pending: 'secondary',
    approved: 'default',
    rejected: 'destructive'
  } as const

  return (
    <Badge variant={variantMap[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}