// src/components/admin/SlipRequests/AutoApprovalSettings.tsx
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { PlusIcon, TrashIcon } from '@radix-ui/react-icons'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'

// Define the AutoApprovalRule type
interface AutoApprovalRule {
  id: string;
  name: string;
  condition: string;
  value: string;
  enabled: boolean;
}

export default function AutoApprovalSettings({
  open,
  onClose,
  autoApprovalRules,
  updateAutoApprovalRules
}: {
  open: boolean;
  onClose: () => void;
  autoApprovalRules: AutoApprovalRule[];
  updateAutoApprovalRules: (rules: AutoApprovalRule[]) => void;
}) {
  const [rules, setRules] = useState<AutoApprovalRule[]>(autoApprovalRules)

  const addNewRule = () => {
    const newRule: AutoApprovalRule = {
      id: Date.now().toString(),
      name: 'New Rule',
      condition: 'time_between',
      value: '9:00-17:00',
      enabled: true
    }
    setRules([...rules, newRule])
  }

  const updateRule = (id: string, field: keyof AutoApprovalRule, value: any) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, [field]: value } : rule
    ))
  }

  const deleteRule = (id: string) => {
    setRules(rules.filter(rule => rule.id !== id))
  }

  const saveRules = () => {
    updateAutoApprovalRules(rules)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Auto-Approval Rules</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 my-4">
          {rules.map((rule) => (
            <div key={rule.id} className="flex items-center gap-2 p-3 border rounded-md">
              <div className="flex-grow grid grid-cols-4 gap-2">
                <Input 
                  placeholder="Rule name"
                  value={rule.name}
                  onChange={(e) => updateRule(rule.id, 'name', e.target.value)}
                  className="col-span-1"
                />
                <div className="col-span-2 flex gap-2">
                  <Select 
                    value={rule.condition}
                    onValueChange={(value) => updateRule(rule.id, 'condition', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="time_between">Time Between</SelectItem>
                      <SelectItem value="is_weekend">Is Weekend</SelectItem>
                      <SelectItem value="student_grade">Student Grade</SelectItem>
                      <SelectItem value="slip_reason">Slip Reason Contains</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Input 
                    placeholder="Value"
                    value={rule.value}
                    onChange={(e) => updateRule(rule.id, 'value', e.target.value)}
                  />
                </div>
                <div className="col-span-1 flex items-center justify-end gap-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`rule-${rule.id}`} className="sr-only">Enabled</Label>
                    <Switch 
                      id={`rule-${rule.id}`}
                      checked={rule.enabled} 
                      onCheckedChange={(checked) => updateRule(rule.id, 'enabled', checked)}
                    />
                  </div>
                  <Button
                    variant="ghost" 
                    size="icon"
                    onClick={() => deleteRule(rule.id)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          <Button onClick={addNewRule} variant="outline" className="w-full">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Rule
          </Button>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={saveRules}>Save Rules</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}