// src/components/admin/SlipRequests/AutoApprovalSettings.tsx
'use client'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useSlipRequests } from '@/context/SlipRequestsContext'
import { useState } from 'react'
import { AutoApprovalRule } from '@/types/modules/slipRequests'

export default function AutoApprovalSettings({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const { autoApprovalRules, updateAutoApprovalRules } = useSlipRequests()
  const [rules, setRules] = useState<AutoApprovalRule[]>(autoApprovalRules)

  const addNewRule = () => {
    setRules([...rules, {
      id: `temp-${Date.now()}`,
      name: 'New Rule',
      condition: {
        field: 'reason',
        operator: 'contains',
        value: ''
      },
      action: 'approve',
      active: true
    }])
  }

  const updateRuleField = (id: string, field: string, value: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ))
  }

  const updateRuleCondition = (id: string, field: keyof AutoApprovalRule['condition'], value: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { 
        ...rule, 
        condition: { 
          ...rule.condition, 
          [field]: field === 'value' && !isNaN(Number(value)) ? Number(value) : value 
        } 
      } : rule
    ))
  }

  const saveRules = async () => {
    await updateAutoApprovalRules(rules)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Auto-Approval Rules</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Configure rules to automatically approve or reject slip requests
            </p>
            <Button size="sm" onClick={addNewRule}>
              <Plus className="h-4 w-4 mr-2" />
              Add Rule
            </Button>
          </div>

          <div className="space-y-4">
            {rules.map((rule) => (
              <div key={rule.id} className="p-4 border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Rule Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      value={rule.name}
                      onChange={(e) => updateRuleField(rule.id, 'name', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Field</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      value={rule.condition.field}
                      onChange={(e) => updateRuleCondition(rule.id, 'field', e.target.value)}
                    >
                      <option value="reason">Reason</option>
                      <option value="student.violationCount">Violation Count</option>
                      <option value="student.gradeLevel">Grade Level</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Operator</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      value={rule.condition.operator}
                      onChange={(e) => updateRuleCondition(rule.id, 'operator', e.target.value)}
                    >
                      <option value="contains">Contains</option>
                      <option value="equals">Equals</option>
                      <option value="lessThan">Less Than</option>
                      <option value="greaterThan">Greater Than</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Value</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      value={rule.condition.value}
                      onChange={(e) => updateRuleCondition(rule.id, 'value', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Action</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      value={rule.action}
                      onChange={(e) => updateRuleField(rule.id, 'action', e.target.value)}
                    >
                      <option value="approve">Approve</option>
                      <option value="reject">Reject</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={saveRules}>
              Save Rules
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}