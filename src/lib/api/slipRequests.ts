import { SlipRequest, AutoApprovalRule } from '@/types/modules/slipRequests'

export const slipRequestsService = {
  async getAll(): Promise<SlipRequest[]> {
    // In a real app, this would be an API call
    const response = await fetch('/api/slip-requests')
    return response.json()
  },

  async updateStatus(requestIds: string[], status: 'approved' | 'rejected'): Promise<void> {
    // API call to update status
    await fetch('/api/slip-requests/status', {
      method: 'PUT',
      body: JSON.stringify({ requestIds, status })
    })
  },

  async getAutoApprovalRules(): Promise<AutoApprovalRule[]> {
    // API call to get rules
    const response = await fetch('/api/slip-requests/auto-approval')
    return response.json()
  },

  async updateAutoApprovalRules(rules: AutoApprovalRule[]): Promise<void> {
    // API call to update rules
    await fetch('/api/slip-requests/auto-approval', {
      method: 'PUT',
      body: JSON.stringify({ rules })
    })
  }
}