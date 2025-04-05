// src/types/modules/student.d.ts
import { SlipStatus, ViolationType } from '@/types/shared/enums';
import { User } from '@/types/shared/base';

export interface Student extends User {
  studentId: string;
  yearLevel: string;
  section: string;
  violations: StudentViolation[];
  slipHistory: AdmissionSlip[];
}

export interface AdmissionSlip {
  id: string;
  reason: string;
  status: SlipStatus;
  validFrom: Date;
  validTo: Date;
  qrCode: string;
  rejectionReason?: string;
}

export interface StudentViolation {
  id: string;
  type: ViolationType;
  date: Date;
  status: 'pending' | 'approved' | 'rejected';
  description?: string;
  resolved: boolean;
}