// src/app/(admin)/admin-dashboard/page.tsx
'use client'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Search, FileText, AlertCircle, Flag, Filter, Download, Plus,
  RefreshCcw, Calendar, BarChart3, ArrowUpRight, Clock
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/admin/FlaggedStudentsTable'
import { columns } from '@/components/admin/FlaggedStudentsColumns'
import { FlaggedStudent } from '@/types/modules/admin'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

export default function AdminDashboard() {
  const router = useRouter()
  const [dateFilter, setDateFilter] = useState('today')
  const [activeTab, setActiveTab] = useState('overview')

  const dashboardStats = {
    totalViolations: 42,
    pendingRequests: 15,
    flaggedStudents: 8,
    violationsByType: [
      { type: 'Late Arrival', count: 18 },
      { type: 'Unauthorized Area', count: 12 },
      { type: 'Dress Code', count: 8 },
      { type: 'Other', count: 4 },
    ],
    recentActivity: [
      { id: 1, student: 'John Doe', action: 'Violation Reported', time: '10 mins ago', status: 'warning' },
      { id: 2, student: 'Jane Smith', action: 'Slip Approved', time: '25 mins ago', status: 'success' },
      { id: 3, student: 'Mike Johnson', action: 'Account Flagged', time: '1 hour ago', status: 'danger' },
      { id: 4, student: 'Sarah Williams', action: 'Slip Request', time: '2 hours ago', status: 'info' },
      { id: 5, student: 'David Brown', action: 'Violation Appeal', time: '3 hours ago', status: 'warning' },
    ],
    flaggedStudentsData: [
      {
        student: {
          id: 'ST001',
          name: 'Alex Brown',
          studentId: '2023-001',
          email: 'alex@school.edu'
        },
        reason: 'Multiple violations in one week',
        actionRequired: true
      },
      {
        student: {
          id: 'ST002',
          name: 'Chris Lee',
          studentId: '2023-002',
          email: 'chris@school.edu'
        },
        reason: 'Unauthorized area access',
        actionRequired: true
      }
    ] as FlaggedStudent[]
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'danger': return 'bg-red-100 text-red-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  const quickActions = [
    { label: 'Create New Account', icon: Plus, href: '/admin/user-management/add' },
    { label: 'Approve Requests', icon: FileText, href: '/admin/slip-requests' },
    { label: 'View Violations', icon: AlertCircle, href: '/admin/violations' },
    { label: 'System Settings', icon: RefreshCcw, href: '/admin/settings' },
  ]

  return (
    <div className="space-y-6">
      {/* Enhanced Page Header */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor and manage student activities, violations, and admission slips.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search students or users..."
                className="pl-10 w-full"
              />
            </div>
            <Button size="sm" variant="outline">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
        </div>

        {/* Date Filter Controls */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[180px]">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" /> Last updated: Just now
            </Badge>
          </div>

          <Button variant="ghost" size="sm">
            <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
          </Button>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action, i) => (
          <Card
            key={i}
            className="cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => router.push(action.href)}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
              <div className="rounded-full bg-primary/10 p-2">
                <action.icon className="h-5 w-5 text-primary" />
              </div>
              <p className="text-sm font-medium">{action.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="flagged">Flagged Students</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Overview with improved visuals */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 h-full w-16 bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Violations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-1">
                  <div className="text-3xl font-bold">{dashboardStats.totalViolations}</div>
                  <div className="flex items-center text-xs text-emerald-600">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>+2 from last week</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 h-full w-16 bg-blue-500/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-500" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-1">
                  <div className="text-3xl font-bold">{dashboardStats.pendingRequests}</div>
                  <div className="flex items-center text-xs text-emerald-600">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>+5 since yesterday</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 h-full w-16 bg-orange-500/10 flex items-center justify-center">
                <Flag className="h-6 w-6 text-orange-500" />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Flagged Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-1">
                  <div className="text-3xl font-bold">{dashboardStats.flaggedStudents}</div>
                  <div className="flex items-center text-xs text-emerald-600">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    <span>+1 new this week</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Visualizations Section */}
          <Card>
            <CardHeader>
              <CardTitle>Violation Breakdown</CardTitle>
              <CardDescription>Distribution of violations by type</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Simple visualization */}
              <div className="space-y-4">
                {dashboardStats.violationsByType.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.type}</span>
                      <span className="text-sm font-medium">{item.count}</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${(item.count / dashboardStats.totalViolations) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions and events in the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardStats.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium leading-none">{activity.student}</p>
                        <Badge variant="secondary" className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                      <Button variant="ghost" size="sm">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flagged">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Flagged Students</CardTitle>
                <CardDescription>Students flagged for violations or requiring attention</CardDescription>
              </div>
              <Button size="sm">View All</Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <div className="min-w-full inline-block align-middle">
                  <DataTable
                    columns={columns}
                    data={dashboardStats.flaggedStudentsData}
                    onRowClick={(studentId) => router.push(`/student-profile/${studentId}`)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}