// app/(admin)/slip-requests/page.tsx
'use client'

import { useState } from 'react'
import { SlipRequestsTable } from '@/components/admin/SlipRequests/SlipRequestsTable'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { SlipRequest } from '@/types/modules/admin'
import { Calendar, Download, Filter, RefreshCcw, Search, ThumbsDown, ThumbsUp, Clock, CheckCircle, XCircle, AlertCircle, CalendarIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export default function SlipRequestsPage() {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [dateFilter, setDateFilter] = useState<string>('today')
  const [selectedRequests, setSelectedRequests] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [activeTab, setActiveTab] = useState<string>('all')

  // Properly typed mock data with more samples
  const slipRequests: SlipRequest[] = [
    {
      id: '1',
      studentName: 'Alex Johnson',
      studentId: 'STU-2023-0456',
      requestDate: '2023-10-15',
      reason: 'Medical appointment with doctor',
      status: 'pending' as const
    },
    {
      id: '2',
      studentName: 'Maria Garcia',
      studentId: 'STU-2023-0789',
      requestDate: '2023-10-16',
      reason: 'Family emergency',
      status: 'approved' as const
    },
    {
      id: '3',
      studentName: 'James Wilson',
      studentId: 'STU-2023-0923',
      requestDate: '2023-10-17',
      reason: 'Dental checkup',
      status: 'rejected' as const
    },
    {
      id: '4',
      studentName: 'Sarah Lee',
      studentId: 'STU-2023-1042',
      requestDate: '2023-10-18',
      reason: 'Academic competition',
      status: 'pending' as const
    },
    {
      id: '5',
      studentName: 'Michael Brown',
      studentId: 'STU-2023-1105',
      requestDate: '2023-10-18',
      reason: 'Doctor appointment',
      status: 'pending' as const
    },
    {
      id: '6',
      studentName: 'Emily Chen',
      studentId: 'STU-2023-1267',
      requestDate: '2023-10-19',
      reason: 'Family event',
      status: 'approved' as const
    }
  ]

  // Summary statistics
  const stats = {
    pending: slipRequests.filter(req => req.status === 'pending').length,
    approved: slipRequests.filter(req => req.status === 'approved').length,
    rejected: slipRequests.filter(req => req.status === 'rejected').length,
    total: slipRequests.length
  }

  // Apply filters based on status, tab and search query
  const getFilteredRequests = () => {
    let filtered = slipRequests;

    // Filter by tab first
    if (activeTab !== 'all') {
      filtered = filtered.filter(req => req.status === activeTab);
    }

    // Then apply status filter if it's not matching the tab
    if (statusFilter !== 'all' && statusFilter !== activeTab) {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    // Apply search filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(req =>
        req.studentName.toLowerCase().includes(query) ||
        req.studentId.toLowerCase().includes(query) ||
        req.reason.toLowerCase().includes(query)
      );
    }

    return filtered;
  }

  const filteredRequests = getFilteredRequests();

  const handleBulkApprove = () => {
    console.log('Approving:', selectedRequests)
    // API call would go here
  }

  const handleBulkReject = () => {
    console.log('Rejecting:', selectedRequests)
    // API call would go here
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Reset status filter when changing tabs to avoid conflicts
    setStatusFilter('all');
  }

  return (
    <div className="space-y-6">
      {/* Enhanced Page Header */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Slip Requests</h1>
            <p className="text-muted-foreground">
              Review and manage student admission slip requests
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search students or requests..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="outline">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div className="space-y-4">
                  <h4 className="font-medium">Filter Options</h4>
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Status</h5>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Requests</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <h5 className="text-sm font-medium">Date</h5>
                    <Select value={dateFilter} onValueChange={setDateFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Filter by date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="yesterday">Yesterday</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                        <SelectItem value="month">This Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
            <Button size="sm" variant="ghost">
              <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
            </Button>
          </div>
        </div>

        {/* Date indicator and selected items info */}
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <CalendarIcon className="h-3 w-3" /> April 6, 2025
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" /> Updated just now
            </Badge>
          </div>

          {selectedRequests.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {selectedRequests.length} requests selected
              </span>
              <Button
                variant="default"
                size="sm"
                onClick={handleBulkApprove}
              >
                <ThumbsUp className="h-4 w-4 mr-2" /> Approve Selected
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkReject}
              >
                <ThumbsDown className="h-4 w-4 mr-2" /> Reject Selected
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="p-2 bg-gray-100 rounded-full">
              <AlertCircle className="h-4 w-4 text-gray-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-full">
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Approved</p>
              <p className="text-2xl font-bold">{stats.approved}</p>
            </div>
            <div className="p-2 bg-green-100 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex flex-row items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Rejected</p>
              <p className="text-2xl font-bold">{stats.rejected}</p>
            </div>
            <div className="p-2 bg-red-100 rounded-full">
              <XCircle className="h-4 w-4 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Content */}
      <Card>
        <CardHeader>
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-4 w-full md:w-[400px]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className={cn("p-0", filteredRequests.length === 0 ? "py-8" : "")}>
          {filteredRequests.length > 0 ? (
            <SlipRequestsTable
              requests={filteredRequests}
              selectedRequests={selectedRequests}
              onSelectRequests={setSelectedRequests}
            />
          ) : (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-muted">
                  <AlertCircle className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-lg font-medium">No requests found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}