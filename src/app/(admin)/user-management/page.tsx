// src/app/(admin)/user-management/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
    Pagination, 
    PaginationContent, 
    PaginationEllipsis, 
    PaginationItem, 
    PaginationLink, 
    PaginationNext, 
    PaginationPrevious 
} from '@/components/ui/pagination'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MoreHorizontal, Search, RefreshCw, Plus, User, PenSquare, Trash2, UserPlus, Download, Filter, Eye } from 'lucide-react'
import { toast } from 'sonner'

// Define types for users
interface BaseUser {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
  status: 'active' | 'inactive' | 'suspended'
}

interface StudentUser extends BaseUser {
  role: 'student'
  studentId: string
  yearLevel: string
  section: string
  violationCount: number
  slipStatus?: 'expired' | 'none' | 'approved' | 'pending' | 'active'
}

interface GuardUser extends BaseUser {
  role: 'guard'
  badgeNumber: string
  department: string
  shifts?: string[]
}

interface AdminUser extends BaseUser {
  role: 'admin'
  permissions: string[]
  lastLogin?: string
}

type User = StudentUser | GuardUser | AdminUser

export default function UserManagementPage() {
  // State for user data and UI controls
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)
  const [bulkAction, setBulkAction] = useState<string | null>(null)
  
  // Mock user data
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Alex Brown',
      email: 'alex@school.edu',
      role: 'student',
      avatar: '/avatars/student.png',
      createdAt: '2023-06-15',
      status: 'active',
      studentId: 'STU-2023-0001',
      yearLevel: '3rd Year',
      section: 'Section A',
      violationCount: 2,
      slipStatus: 'approved'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@school.edu',
      role: 'student',
      createdAt: '2023-06-20',
      status: 'active',
      studentId: 'STU-2023-0002',
      yearLevel: '2nd Year',
      section: 'Section B',
      violationCount: 0,
      slipStatus: 'none'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@school.edu',
      role: 'student',
      createdAt: '2023-05-10',
      status: 'suspended',
      studentId: 'STU-2023-0003',
      yearLevel: '4th Year',
      section: 'Section C',
      violationCount: 5,
      slipStatus: 'expired'
    },
    {
      id: '4',
      name: 'Officer Smith',
      email: 'smith@guard.edu',
      role: 'guard',
      avatar: '/avatars/guard.png',
      createdAt: '2022-12-01',
      status: 'active',
      badgeNumber: 'G-2023-0456',
      department: 'Main Gate Security'
    },
    {
      id: '5',
      name: 'Officer Johnson',
      email: 'johnson@guard.edu',
      role: 'guard',
      createdAt: '2023-01-15',
      status: 'inactive',
      badgeNumber: 'G-2023-0789',
      department: 'Building A Security'
    },
    {
      id: '6',
      name: 'Admin User',
      email: 'admin@school.edu',
      role: 'admin',
      avatar: '/avatars/admin.png',
      createdAt: '2022-01-01',
      status: 'active',
      permissions: ['full_access', 'user_management', 'system_settings'],
      lastLogin: '2023-09-01'
    }
  ])

  // Filter users based on active tab and search query
  const filteredUsers = users.filter(user => {
    const matchesTab = activeTab === 'all' || user.role === activeTab
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.role === 'student' && user.studentId.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.role === 'guard' && user.badgeNumber.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesTab && matchesSearch
  })

  // Pagination settings
  const itemsPerPage = 10
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Handle user selection for bulk actions
  const handleUserSelect = (userId: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedUsers([...selectedUsers, userId])
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== userId))
    }
  }

  // Handle "select all" checkbox
  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      setSelectedUsers(paginatedUsers.map(user => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  // Handle user editing
  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setIsEditUserOpen(true)
  }

  // Handle user deletion confirmation
  const handleDeleteUser = (user: User) => {
    setSelectedUser(user)
    setIsConfirmDeleteOpen(true)
  }

  // Execute user deletion
  const confirmDeleteUser = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id))
      setIsConfirmDeleteOpen(false)
      setSelectedUser(null)
      toast.success(`User ${selectedUser.name} deleted successfully`)
    }
  }

  // Handle bulk actions
  const executeBulkAction = (action: string) => {
    setIsLoading(true)
    
    setTimeout(() => {
      switch (action) {
        case 'activate':
          setUsers(users.map(user => 
            selectedUsers.includes(user.id) ? { ...user, status: 'active' } : user
          ))
          toast.success(`${selectedUsers.length} users activated`)
          break
        case 'deactivate':
          setUsers(users.map(user => 
            selectedUsers.includes(user.id) ? { ...user, status: 'inactive' } : user
          ))
          toast.success(`${selectedUsers.length} users deactivated`)
          break
        case 'delete':
          setUsers(users.filter(user => !selectedUsers.includes(user.id)))
          toast.success(`${selectedUsers.length} users deleted`)
          break
      }
      
      setSelectedUsers([])
      setBulkAction(null)
      setIsLoading(false)
    }, 1000)
  }

  // Reset pagination when tab or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [activeTab, searchQuery])

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button onClick={() => setIsAddUserOpen(true)} className="flex gap-2 items-center w-full md:w-auto">
          <UserPlus className="h-4 w-4" />
          Add New User
        </Button>
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="student">Students</TabsTrigger>
            <TabsTrigger value="guard">Guards</TabsTrigger>
            <TabsTrigger value="admin">Admins</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setSearchQuery('')}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-muted p-3 rounded-lg flex justify-between items-center">
          <div className="text-sm">{selectedUsers.length} users selected</div>
          <div className="flex gap-2">
            <Select value={bulkAction || ''} onValueChange={setBulkAction}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Bulk Actions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="activate">Activate</SelectItem>
                <SelectItem value="deactivate">Deactivate</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              disabled={!bulkAction || isLoading}
              onClick={() => bulkAction && executeBulkAction(bulkAction)}
            >
              {isLoading ? 
                <RefreshCw className="h-4 w-4 animate-spin" /> : 
                'Apply'
              }
            </Button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>User Directory</CardTitle>
          <CardDescription>
            Manage all user accounts in the system
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40px]">
                    <Checkbox 
                      onCheckedChange={(checked: boolean) => handleSelectAll(checked)}
                      checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>ID/Badge</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={(checked: boolean) => handleUserSelect(user.id, checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          user.role === 'admin' ? 'default' :
                          user.role === 'guard' ? 'secondary' : 'outline'
                        }
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.role === 'student' && (user as StudentUser).studentId}
                      {user.role === 'guard' && (user as GuardUser).badgeNumber}
                      {user.role === 'admin' && '—'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${
                          user.status === 'active' ? 'bg-green-500' :
                          user.status === 'inactive' ? 'bg-gray-500' : 'bg-red-500'
                        }`} />
                        <span className="text-xs">
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>
                            <PenSquare className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteUser(user)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-6 py-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              const showEllipsisBefore = totalPages > 5 && currentPage > 3
              const showEllipsisAfter = totalPages > 5 && currentPage < totalPages - 2
              
              // Handle showing ellipsis for many pages
              if (totalPages <= 5) {
                // Show all pages if total is 5 or less
                return (
                  <Button 
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                )
              } else {
                // Complex pagination with ellipsis
                if (i === 0 && showEllipsisBefore) {
                  return (
                    <React.Fragment key={i}>
                      <Button 
                        variant={currentPage === 1 ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setCurrentPage(1)}
                      >
                        1
                      </Button>
                      <span>...</span>
                    </React.Fragment>
                  )
                }
                
                if (i === 4 && showEllipsisAfter) {
                  return (
                    <React.Fragment key={i}>
                      <span>...</span>
                      <Button
                        variant={currentPage === totalPages ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(totalPages)}
                      >
                        {totalPages}
                      </Button>
                    </React.Fragment>
                  )
                }
                
                // Middle pages
                const pageNumber = showEllipsisBefore
                  ? currentPage - 2 + i
                  : showEllipsisAfter
                    ? i + 1
                    : totalPages - 4 + i
                
                if ((showEllipsisBefore && i < 3) || (showEllipsisAfter && i < 3) || (!showEllipsisBefore && !showEllipsisAfter)) {
                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  )
                }
                
                return null
              }
            })}
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account in the system
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role">User Role</Label>
              <Select defaultValue="student">
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="guard">Security Guard</SelectItem>
                  <SelectItem value="admin">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter full name" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter email address" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="studentId">Student ID</Label>
              <Input id="studentId" placeholder="e.g. STU-2023-0001" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="yearLevel">Year Level</Label>
                <Select defaultValue="">
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st Year">1st Year</SelectItem>
                    <SelectItem value="2nd Year">2nd Year</SelectItem>
                    <SelectItem value="3rd Year">3rd Year</SelectItem>
                    <SelectItem value="4th Year">4th Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Input id="section" placeholder="e.g. Section A" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Temporary Password</Label>
              <Input id="password" type="password" placeholder="Enter temporary password" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="status">Account Status</Label>
              </div>
              <Switch id="status" defaultChecked />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              setIsAddUserOpen(false)
              toast.success('New user created successfully!')
            }}>Create User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Modify user account details
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback>
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <Badge className="mt-1">{selectedUser.role}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-name">Full Name</Label>
                <Input id="edit-name" defaultValue={selectedUser.name} />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email Address</Label>
                <Input id="edit-email" type="email" defaultValue={selectedUser.email} />
              </div>
              
              {selectedUser.role === 'student' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="edit-studentId">Student ID</Label>
                    <Input 
                      id="edit-studentId" 
                      defaultValue={(selectedUser as StudentUser).studentId} 
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="edit-yearLevel">Year Level</Label>
                      <Select defaultValue={(selectedUser as StudentUser).yearLevel}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1st Year">1st Year</SelectItem>
                          <SelectItem value="2nd Year">2nd Year</SelectItem>
                          <SelectItem value="3rd Year">3rd Year</SelectItem>
                          <SelectItem value="4th Year">4th Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="edit-section">Section</Label>
                      <Input 
                        id="edit-section" 
                        defaultValue={(selectedUser as StudentUser).section} 
                      />
                    </div>
                  </div>
                </>
              )}
              
              {selectedUser.role === 'guard' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="edit-badgeNumber">Badge Number</Label>
                    <Input 
                      id="edit-badgeNumber" 
                      defaultValue={(selectedUser as GuardUser).badgeNumber} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="edit-department">Department</Label>
                    <Input 
                      id="edit-department" 
                      defaultValue={(selectedUser as GuardUser).department} 
                    />
                  </div>
                </>
              )}
              
              {selectedUser.role === 'admin' && (
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="perm-user" defaultChecked />
                      <label htmlFor="perm-user">User Management</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="perm-slips" defaultChecked />
                      <label htmlFor="perm-slips">Slip Approval</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="perm-system" defaultChecked />
                      <label htmlFor="perm-system">System Settings</label>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="edit-password">Reset Password</Label>
                <Input id="edit-password" type="password" placeholder="Enter new password (leave blank to keep current)" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="edit-status">Account Status</Label>
                </div>
                <Switch 
                  id="edit-status" 
                  checked={selectedUser.status === 'active'} 
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>Cancel</Button>
            <Button onClick={() => {
              setIsEditUserOpen(false)
              toast.success('User updated successfully!')
            }}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isConfirmDeleteOpen} onOpenChange={setIsConfirmDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this user? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="py-4">
              <div className="flex items-center gap-4 p-4 border rounded-lg">
                <Avatar>
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback>
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{selectedUser.name}</h3>
                  <p className="text-sm">{selectedUser.email}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{selectedUser.role}</Badge>
                    {selectedUser.role === 'student' && (
                      <span className="text-xs text-muted-foreground">
                        ID: {(selectedUser as StudentUser).studentId}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteUser}>
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}