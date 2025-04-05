// src/types/shared/enums.d.ts
// src/types/shared/enums.d.ts
export type SlipStatus = 'expired' | 'none' | 'approved' | 'pending' | 'active'

export enum ViolationType {
  LATE = 'late',  
  UNAUTHORIZED_EXIT = 'unauthorized_exit',
  DRESS_CODE = 'dress_code',
  OTHER = 'other'
}

export enum ViolationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',  // Make sure this matches
  REJECTED = 'rejected'
}

export enum NotificationType {
  SLIP_APPROVAL = 'slip_approval',
  VIOLATION_WARNING = 'violation_warning',
  VIOLATION_RESOLVED = 'violation_resolved'
}