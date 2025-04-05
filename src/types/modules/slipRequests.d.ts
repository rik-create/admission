export interface SlipRequest {
    id: string;
    student: {
      id: string;
      name: string;
      email: string;
      gradeLevel: number;
      violationCount: number;
      lastViolationDate: Date | null;
    };
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
    details: {  // Removed the ? to make it required
      duration?: number;
      destination?: string | null;
      notes?: string | null;
    };
  }
  
  export interface AutoApprovalRule {
    id: string;
    name: string;
    condition: {
      field: 'reason' | 'student.violationCount' | 'student.gradeLevel';
      operator: 'contains' | 'equals' | 'lessThan' | 'greaterThan';
      value: string | number;
    };
    action: 'approve' | 'reject';
    active: boolean;
  }