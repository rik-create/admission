'use client'

import { useState } from 'react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { 
  GearIcon, 
  BellIcon, 
  LockClosedIcon, 
  ColorWheelIcon, 
  PersonIcon, 
  FilePlusIcon,
  ExclamationTriangleIcon
} from '@radix-ui/react-icons'
import AutoApprovalSettings from '@/components/admin/SlipRequests/AutoApprovalSettings'

// Define the AutoApprovalRule type
interface AutoApprovalRule {
  id: string;
  name: string;
  condition: string;
  value: string;
  enabled: boolean;
}

export default function AdminSettingsPage() {
  // State for various settings
  const [autoApprovalOpen, setAutoApprovalOpen] = useState(false)
  const [systemSettings, setSystemSettings] = useState({
    defaultSlipDuration: 24,
    maxViolations: 3,
    rejectionThreshold: 2,
    autoApprovalEnabled: true,
    darkMode: false,
    highContrastMode: false,
    emailNotifications: true,
    pushNotifications: true,
    inAppNotifications: true,
    sessionTimeout: 30
  })
  
  // Add state for auto approval rules
  const [autoApprovalRules, setAutoApprovalRules] = useState<AutoApprovalRule[]>([
    {
      id: '1',
      name: 'Regular Hours',
      condition: 'time_between',
      value: '8:00-17:00',
      enabled: true
    },
    {
      id: '2',
      name: 'Weekend Rule',
      condition: 'is_weekend',
      value: 'true',
      enabled: false
    }
  ])

  // Function to update auto approval rules
  const updateAutoApprovalRules = (newRules: AutoApprovalRule[]) => {
    setAutoApprovalRules(newRules)
    console.log('Updated auto approval rules:', newRules)
  }

  // Handler for updating settings
  const updateSetting = (setting: string, value: any) => {
    setSystemSettings({
      ...systemSettings,
      [setting]: value
    })
  }

  // Mock save function
  const saveSettings = () => {
    console.log('Saving settings:', systemSettings)
    // Here you would make API call to save settings
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Settings</h1>
        <Button onClick={saveSettings}>
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="system" className="w-full">
        <TabsList className="grid grid-cols-5 w-full max-w-4xl">
          <TabsTrigger value="system" className="flex items-center gap-2">
            <GearIcon className="h-4 w-4" />
            <span className="hidden sm:inline">System</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2">
            <ColorWheelIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <BellIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <LockClosedIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <PersonIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
        </TabsList>

        {/* System Settings Tab */}
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>
                Configure core system settings and behavior.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="defaultSlipDuration">Default Slip Duration (hours)</Label>
                  <Input
                    id="defaultSlipDuration"
                    type="number"
                    value={systemSettings.defaultSlipDuration}
                    onChange={(e) => updateSetting('defaultSlipDuration', parseInt(e.target.value))}
                  />
                  <p className="text-sm text-muted-foreground">
                    How long admission slips remain valid by default
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxViolations">Max Violations Before Manual Review</Label>
                  <Input
                    id="maxViolations"
                    type="number"
                    value={systemSettings.maxViolations}
                    onChange={(e) => updateSetting('maxViolations', parseInt(e.target.value))}
                  />
                  <p className="text-sm text-muted-foreground">
                    Number of violations before requiring manual approval
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoApproval">Auto-Approval</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically approve slip requests based on rules
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Switch
                    id="autoApproval"
                    checked={systemSettings.autoApprovalEnabled}
                    onCheckedChange={(checked) => updateSetting('autoApprovalEnabled', checked)}
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => setAutoApprovalOpen(true)}
                    disabled={!systemSettings.autoApprovalEnabled}
                  >
                    <FilePlusIcon className="mr-2 h-4 w-4" />
                    Configure Rules
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Flagged Students Thresholds</CardTitle>
              <CardDescription>
                Configure when students should be flagged for review
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="violationThreshold">Violations Threshold</Label>
                    <span className="text-sm font-medium">
                      {systemSettings.maxViolations} violations
                    </span>
                  </div>
                  <Slider
                    id="violationThreshold"
                    value={[systemSettings.maxViolations]}
                    max={10}
                    step={1}
                    onValueChange={(value: number[]) => updateSetting('maxViolations', value[0])}
                  />
                  <p className="text-sm text-muted-foreground">
                    Number of violations before a student is automatically flagged
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="rejectionThreshold">Rejection Threshold</Label>
                    <span className="text-sm font-medium">
                      {systemSettings.rejectionThreshold} rejections
                    </span>
                  </div>
                  <Slider
                    id="rejectionThreshold"
                    value={[systemSettings.rejectionThreshold]}
                    max={5}
                    step={1}
                    onValueChange={(value: number[]) => updateSetting('rejectionThreshold', value[0])}
                  />
                  <p className="text-sm text-muted-foreground">
                    Number of rejected requests before a student is flagged
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Customization</CardTitle>
              <CardDescription>
                Customize the appearance of the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Use dark theme for the admin interface
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={systemSettings.darkMode}
                  onCheckedChange={(checked) => updateSetting('darkMode', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="highContrast">High Contrast Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Increase contrast for better accessibility
                  </p>
                </div>
                <Switch
                  id="highContrast"
                  checked={systemSettings.highContrastMode}
                  onCheckedChange={(checked) => updateSetting('highContrastMode', checked)}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Admin Dashboard Layout</Label>
                <Select defaultValue="default">
                  <SelectTrigger>
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="expanded">Expanded</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Color Scheme</Label>
                <div className="grid grid-cols-4 gap-2">
                  <div className="h-10 w-full bg-blue-500 rounded-md cursor-pointer border-2 border-transparent hover:border-black" />
                  <div className="h-10 w-full bg-purple-500 rounded-md cursor-pointer border-2 border-transparent hover:border-black" />
                  <div className="h-10 w-full bg-green-500 rounded-md cursor-pointer border-2 border-transparent hover:border-black" />
                  <div className="h-10 w-full bg-orange-500 rounded-md cursor-pointer border-2 border-transparent hover:border-black" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive important updates via email
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={systemSettings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive alerts on your device
                    </p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    checked={systemSettings.pushNotifications}
                    onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="inAppNotifications">In-App Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      See alerts within the admin portal
                    </p>
                  </div>
                  <Switch
                    id="inAppNotifications"
                    checked={systemSettings.inAppNotifications}
                    onCheckedChange={(checked) => updateSetting('inAppNotifications', checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Events to be notified about</Label>
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="newSlipRequest" className="rounded" defaultChecked />
                    <label htmlFor="newSlipRequest">New slip requests</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="newViolation" className="rounded" defaultChecked />
                    <label htmlFor="newViolation">New violations</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="flaggedStudent" className="rounded" defaultChecked />
                    <label htmlFor="flaggedStudent">Student flagged for review</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="systemUpdate" className="rounded" />
                    <label htmlFor="systemUpdate">System updates</label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security options for the admin portal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                  />
                  <p className="text-sm text-muted-foreground">
                    Automatically log out after period of inactivity
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twoFactorAuth">Two-Factor Authentication</Label>
                  <Select defaultValue="optional">
                    <SelectTrigger id="twoFactorAuth">
                      <SelectValue placeholder="Select 2FA policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="disabled">Disabled</SelectItem>
                      <SelectItem value="optional">Optional</SelectItem>
                      <SelectItem value="required">Required for all admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="loginAttempts">Failed Login Attempts Action</Label>
                    <p className="text-sm text-muted-foreground">
                      What happens after multiple failed logins
                    </p>
                  </div>
                  <Select defaultValue="lockout">
                    <SelectTrigger id="loginAttempts" className="w-40">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nothing">Do nothing</SelectItem>
                      <SelectItem value="captcha">Show CAPTCHA</SelectItem>
                      <SelectItem value="lockout">Temporary lockout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="destructive" className="flex items-center gap-2">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  Reset All Admin Passwords
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audit Logging</CardTitle>
              <CardDescription>
                Configure how admin actions are logged
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="extendedLogging">Extended Logging</Label>
                  <p className="text-sm text-muted-foreground">
                    Log detailed information about all admin actions
                  </p>
                </div>
                <Switch id="extendedLogging" defaultChecked />
              </div>

              <div className="space-y-2">
                <Label>Log Retention Period</Label>
                <Select defaultValue="90">
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="180">180 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Configure user-related settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Default Role for New Users</Label>
                <Select defaultValue="student">
                  <SelectTrigger>
                    <SelectValue placeholder="Select default role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="guard">Security Guard</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Password Policy</Label>
                <div className="grid gap-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="minLength" className="rounded" defaultChecked />
                    <label htmlFor="minLength">Minimum 8 characters</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="uppercase" className="rounded" defaultChecked />
                    <label htmlFor="uppercase">Require uppercase letters</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="numbers" className="rounded" defaultChecked />
                    <label htmlFor="numbers">Require numbers</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="special" className="rounded" />
                    <label htmlFor="special">Require special characters</label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Password Expiration</Label>
                  <span className="text-sm font-medium">
                    90 days
                  </span>
                </div>
                <Slider
                  defaultValue={[90]}
                  max={180}
                  step={30}
                  onValueChange={(value: number[]) => console.log(value)}
                />
                <p className="text-sm text-muted-foreground">
                  Number of days before passwords must be changed
                </p>
              </div>

              <Button className="w-full">
                <PersonIcon className="mr-2 h-4 w-4" />
                Manage User Accounts
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Auto Approval Settings Dialog */}
      <AutoApprovalSettings
        open={autoApprovalOpen}
        onClose={() => setAutoApprovalOpen(false)}
        autoApprovalRules={autoApprovalRules}
        updateAutoApprovalRules={updateAutoApprovalRules}
      />
    </div>
  )
}
