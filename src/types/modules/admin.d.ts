import { User } from '@/types/shared/base';
import { Student } from '@/types/modules/student';

export interface SystemConfig {
  defaultSlipDurationHours: number;
  maxViolationsBeforeManualReview: number;
  notificationSettings: {
    email: boolean;
    sms: boolean;
    inApp: boolean;
  };
}

// types/admin.d.ts
export interface SlipRequest {
  id: string
  studentName: string
  studentId: string
  requestDate: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
}
export interface AuditLog {
  id: string;
  action: string;
  performedBy: User;
  performedOn: Date;
  details: Record<string, unknown>;
}

export interface FlaggedStudent {
  student: Student;
  reason: string;
  actionRequired: boolean;
}
