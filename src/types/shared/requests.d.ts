// API Request & Response structures

export interface APIResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SlipApprovalRequest {
  slipId: string;
  approved: boolean;
  reason?: string;
}
