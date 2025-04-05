// src/app/(admin)/admin-dashboard/page.tsx
'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, FileText, AlertCircle, Flag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/admin/FlaggedStudentsTable'
import { columns } from '@/components/admin/FlaggedStudentsColumns'
import { FlaggedStudent } from '@/types/modules/admin'

export default function AdminDashboard() {
  const router = useRouter()

  const dashboardStats = {
    totalViolations: 42,
    pendingRequests: 15,
    flaggedStudents: 8,
    recentActivity: [
      { id: 1, student: 'John Doe', action: 'Violation Reported', time: '10 mins ago' },
      { id: 2, student: 'Jane Smith', action: 'Slip Approved', time: '25 mins ago' },
      { id: 3, student: 'Mike Johnson', action: 'Account Flagged', time: '1 hour ago' },
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search students or users..."
            className="pl-10 w-full"
          />
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Violations</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalViolations}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.pendingRequests}</div>
            <p className="text-xs text-muted-foreground">+5 since yesterday</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Students</CardTitle>
            <Flag className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.flaggedStudents}</div>
            <p className="text-xs text-muted-foreground">+1 new this week</p>
          </CardContent>
        </Card>
      </div>

      {/* Scrollable Content Section */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Recent Activity - Scrollable on mobile */}
        <div className="w-full md:w-1/2 overflow-x-auto">
          <Card className="min-w-[300px] md:min-w-0">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dashboardStats.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between min-w-[250px]">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{activity.student}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Flagged Students - Scrollable on mobile */}
        <div className="w-full md:w-1/2 overflow-x-auto">
      {/* Flagged Students Card with scrollable table only */}
      <Card>
          <CardHeader>
            <CardTitle>Flagged Students</CardTitle>
          </CardHeader>
          <CardContent className="p-0"> {/* Remove padding to let table handle scrolling */}
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
        </div>
      </div>
    </div>
  )
}