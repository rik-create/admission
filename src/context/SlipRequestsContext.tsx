// @/types/modules/slipRequests.ts

/**
 * Student information associated with a slip request
 */
export interface Student {
  id: string;
  name: string;
  email: string;
  gradeLevel: number;
  violationCount: number;
  lastViolationDate: Date | null;
  /**
   * Additional optional student properties
   */
  studentId?: string; // School-issued student ID
  homeroom?: string;
  contactNumber?: string;
}

/**
 * Detailed information about a slip request
 */
export interface SlipRequestDetails {
  duration?: number; // in minutes
  destination?: string;
  notes?: string;
  approvedBy?: string;
  rejectedReason?: string;
  departureTime?: Date;
  expectedReturnTime?: Date;
}

/**
 * Status history tracking
 */
export interface StatusHistoryItem {
  status: 'pending' | 'approved' | 'rejected';
  changedAt: Date;
  changedBy: string;
  notes?: string;
}

/**
 * Core slip request interface
 */
export interface SlipRequest {
  id: string;
  student: Student;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
  details: SlipRequestDetails;
  statusHistory?: StatusHistoryItem[];
  /**
   * Additional metadata
   */
  requesterId?: string; // ID of staff who submitted (for staff-submitted requests)
  isEmergency?: boolean;
  requiresParentalConsent?: boolean;
  consentGiven?: boolean;
}

/**
 * Condition for auto-approval rules
 */
export interface AutoApprovalCondition {
  field: 'reason' | 'student.violationCount' | 'student.gradeLevel' | 'student.homeroom';
  operator: 'contains' | 'equals' | 'lessThan' | 'greaterThan' | 'startsWith' | 'endsWith';
  value: string | number;
  /**
   * Additional condition properties
   */
  caseSensitive?: boolean;
}

/**
 * Auto-approval rule configuration
 */
export interface AutoApprovalRule {
  id: string;
  name: string;
  description?: string;
  condition: AutoApprovalCondition | AutoApprovalCondition[]; // Single condition or array for AND logic
  action: 'approve' | 'reject' | 'flag';
  active: boolean;
  priority: number; // Higher numbers evaluated first
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

/**
 * Slip request statistics
 */
export interface SlipRequestStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
  byGradeLevel: Record<number, {
    total: number;
    approved: number;
  }>;
  byReason: Record<string, number>;
  dailyAverage: number;
}

/**
 * Filter options for querying slip requests
 */
export interface SlipRequestFilter {
  status?: 'pending' | 'approved' | 'rejected';
  dateRange?: {
    start: Date;
    end: Date;
  };
  studentId?: string;
  gradeLevel?: number;
  reasonContains?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'student.name';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * Response format for paginated slip requests
 */
export interface PaginatedSlipRequests {
  data: SlipRequest[];
  total: number;
  limit: number;
  offset: number;
}

/**
 * Payload for creating/updating slip requests
 */
export interface SlipRequestPayload {
  studentId: string;
  reason: string;
  details?: Omit<SlipRequestDetails, 'approvedBy' | 'rejectedReason'>;
  isEmergency?: boolean;
}

/**
 * Approval/Rejection payload
 */
export interface DecisionPayload {
  requestIds: string[];
  notes?: string;
  duration?: number; // For approvals
  rejectionReason?: string; // For rejections
}