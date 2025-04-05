// src/types/modules/guard.d.ts
import { SlipStatus, ViolationType, ViolationStatus } from '@/types/shared/enums';
import { Student } from '@/types/modules/student';

export interface GuardViolation {
  id: string;
  studentId: string;
  studentName: string;
  type: ViolationType;
  date: Date;
  status: ViolationStatus;
  description: string;
  guardId: string;
  guardName: string;
  resolvedAt?: Date;
}

export interface ViolationFormData {
  studentId: string;
  type: ViolationType;
  description: string;
}

export interface ScanResult {
  student: Student;
  slipStatus: SlipStatus;
  lastViolation?: GuardViolation;
  isFlagged: boolean;
}

export interface ManualEntryData {
  studentId: string;
  slipId?: string;
  verificationNotes: string;
}

export interface OfflineLog {
  scans: ScanResult[];
  violations: Omit<GuardViolation, 'id'>[];
  synced: boolean;
}