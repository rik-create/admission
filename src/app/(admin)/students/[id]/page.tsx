// src/app/(admin)/students/[id]/page.tsx
'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components/ui/tabs'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { toast } from 'sonner'
import { SlipStatus, ViolationType } from '@/types/shared/enums'
import { ArrowLeft, Edit, MoreVertical, Shield, AlertTriangle } from 'lucide-react'
import { format } from 'date-fns'

// Define interfaces for the page
interface StudentViolation {
    id: string;
    type: ViolationType;
    date: Date;
    description: string;
    status: 'pending' | 'resolved';
}

interface SlipRequest {
    id: string;
    requestDate: Date;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    validUntil?: Date;
}

interface Student {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    studentId: string;
    yearLevel: string;
    section: string;
    status: 'active' | 'inactive' | 'suspended';
    violationCount: number;
    slipStatus?: 'expired' | 'none' | 'approved' | 'pending' | 'active';
    violations: StudentViolation[];
    slipRequests: SlipRequest[];
    createdAt: Date;
    contactNumber?: string;
    emergencyContact?: {
        name: string;
        relation: string;
        phone: string;
    };
    lastLogin?: Date;
    isFlagged: boolean;
    flaggedReason?: string;
}

export default function StudentDetailsPage() {
    const router = useRouter()
    const params = useParams<{ id: string }>()
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('overview')
    const [isLoading, setIsLoading] = useState(false)

    // Mock student data - replace with API call
    const [student, setStudent] = useState<Student>({
        id: params.id || '1',
        name: 'Alex Johnson',
        email: 'alex@school.edu',
        avatar: '/avatars/student.png',
        studentId: 'STU-2023-0456',
        yearLevel: '3rd Year',
        section: 'Section A',
        status: 'active',
        violationCount: 2,
        slipStatus: 'approved',
        violations: [
            {
                id: '1',
                date: new Date('2023-10-15'),
                type: ViolationType.LATE,
                description: 'Arrived 15 minutes late',
                status: 'resolved'
            },
            {
                id: '2',
                date: new Date('2023-11-02'),
                type: ViolationType.DRESS_CODE,
                description: 'Incorrect uniform',
                status: 'pending'
            }
        ],
        slipRequests: [
            {
                id: '1',
                requestDate: new Date('2023-10-10'),
                reason: 'Medical appointment',
                status: 'approved',
                validUntil: new Date('2023-10-11')
            },
            {
                id: '2',
                requestDate: new Date('2023-11-05'),
                reason: 'Family emergency',
                status: 'pending'
            }
        ],
        createdAt: new Date('2023-06-15'),
        contactNumber: '+63 912 345 6789',
        emergencyContact: {
            name: 'Robert Johnson',
            relation: 'Father',
            phone: '+63 945 678 9012'
        },
        lastLogin: new Date('2023-11-10'),
        isFlagged: false
    })

    const handleUpdateStudent = (updatedData: Partial<Student>) => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setStudent(prev => ({
                ...prev,
                ...updatedData
            }))
            setIsLoading(false)
            setIsEditDialogOpen(false)
            toast.success('Student updated successfully')
        }, 1000)
    }

    const handleResetPassword = () => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            setIsPasswordResetOpen(false)
            toast.success('Password reset link sent to student\'s email')
        }, 1000)
    }

    const handleToggleStatus = () => {
        const newStatus = student.status === 'active' ? 'suspended' : 'active'
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setStudent(prev => ({
                ...prev,
                status: newStatus as 'active' | 'inactive' | 'suspended'
            }))
            setIsLoading(false)
            toast.success(`Student ${newStatus === 'active' ? 'activated' : 'suspended'} successfully`)
        }, 1000)
    }

    const handleResolveViolation = (violationId: string) => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setStudent(prev => ({
                ...prev,
                violations: prev.violations.map(v =>
                    v.id === violationId ? { ...v, status: 'resolved' } : v
                )
            }))
            setIsLoading(false)
            toast.success('Violation resolved successfully')
        }, 1000)
    }

    const handleApproveSlip = (slipId: string) => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setStudent(prev => ({
                ...prev,
                slipRequests: prev.slipRequests.map(s =>
                    s.id === slipId ? { ...s, status: 'approved', validUntil: new Date(Date.now() + 24 * 60 * 60 * 1000) } : s
                )
            }))
            setIsLoading(false)
            toast.success('Slip request approved')
        }, 1000)
    }

    const handleRejectSlip = (slipId: string) => {
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setStudent(prev => ({
                ...prev,
                slipRequests: prev.slipRequests.map(s =>
                    s.id === slipId ? { ...s, status: 'rejected' } : s
                )
            }))
            setIsLoading(false)
            toast.success('Slip request rejected')
        }, 1000)
    }

    const getStatusBadgeStyles = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'inactive':
                return 'bg-gray-100 text-gray-800 border-gray-200'
            case 'suspended':
                return 'bg-red-100 text-red-800 border-red-200'
            case 'approved':
                return 'bg-green-100 text-green-800 border-green-200'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200'
            case 'rejected':
                return 'bg-blue-100 text-blue-800 border-blue-200'
            case 'resolved':
                return 'bg-green-100 text-green-800 border-green-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header with back button */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-2xl font-bold">Student Details</h1>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant={student.status === 'active' ? 'destructive' : 'default'}
                        onClick={handleToggleStatus}
                        disabled={isLoading}
                    >
                        {student.status === 'active' ? 'Suspend Student' : 'Activate Student'}
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => setIsEditDialogOpen(true)}
                    >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                    </Button>
                </div>
            </div>

            {/* Student Profile Summary */}
            <div className="flex flex-col md:flex-row gap-6">
                {/* Student Info Card */}
                <Card className="w-full md:w-1/3">
                    <CardHeader>
                        <CardTitle>Student Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col items-center gap-4 py-4">
                            <Avatar className="h-24 w-24">
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback>
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold">{student.name}</h3>
                                <p className="text-gray-500">{student.email}</p>
                                <div className="flex justify-center mt-2">
                                    <Badge className={getStatusBadgeStyles(student.status)}>
                                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 pt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Student ID</p>
                                    <p>{student.studentId}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Year Level</p>
                                    <p>{student.yearLevel}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Section</p>
                                    <p>{student.section}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Joined</p>
                                    <p>{format(student.createdAt, 'MMM d, yyyy')}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Phone</p>
                                    <p>{student.contactNumber || 'N/A'}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Last Login</p>
                                    <p>{student.lastLogin ? format(student.lastLogin, 'MMM d, yyyy') : 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div className="border-t pt-4">
                            <h4 className="font-medium mb-2">Emergency Contact</h4>
                            {student.emergencyContact ? (
                                <div className="space-y-1">
                                    <p className="text-sm">{student.emergencyContact.name} ({student.emergencyContact.relation})</p>
                                    <p className="text-sm">{student.emergencyContact.phone}</p>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No emergency contact provided</p>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="border-t pt-4">
                            <h4 className="font-medium mb-2">Quick Actions</h4>
                            <div className="space-y-2">
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    onClick={() => setIsPasswordResetOpen(true)}
                                >
                                    Reset Password
                                </Button>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    onClick={() => setStudent(prev => ({ ...prev, isFlagged: !prev.isFlagged }))}
                                >
                                    {student.isFlagged ? 'Remove Flag' : 'Flag Student'}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content Area with Tabs */}
                <div className="flex-1">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid grid-cols-3 mb-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="violations">Violations</TabsTrigger>
                            <TabsTrigger value="slips">Slip History</TabsTrigger>
                        </TabsList>

                        {/* Overview Tab */}
                        <TabsContent value="overview" className="space-y-4">
                            {student.isFlagged && (
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-3">
                                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                                    <div>
                                        <p className="font-medium text-amber-800">This student is flagged</p>
                                        <p className="text-sm text-amber-700">
                                            {student.flaggedReason || 'Multiple violations in a short period'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Statistics Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-500">Violations</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{student.violationCount}</div>
                                        <p className="text-xs text-muted-foreground">
                                            {student.violations.filter(v => v.status === 'pending').length} pending resolution
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-500">Slip Status</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-2">
                                            <div className={`h-3 w-3 rounded-full ${student.slipStatus === 'approved' || student.slipStatus === 'active'
                                                ? 'bg-green-500'
                                                : student.slipStatus === 'pending'
                                                    ? 'bg-yellow-500'
                                                    : 'bg-red-500'
                                                }`} />
                                            <span className="text-lg font-semibold capitalize">
                                                {student.slipStatus || 'None'}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {student.slipStatus === 'approved' || student.slipStatus === 'active'
                                                ? 'Active until next scan + 24hrs'
                                                : student.slipStatus === 'pending'
                                                    ? 'Awaiting approval'
                                                    : 'No active slip'}
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium text-gray-500">Recent Activity</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-lg font-semibold">
                                            {student.lastLogin
                                                ? `Last login ${format(student.lastLogin, 'MMM d')}`
                                                : 'No recent activity'}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {student.slipRequests.length > 0
                                                ? `Last request: ${format(student.slipRequests[0].requestDate, 'MMM d')}`
                                                : 'No slip requests'}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Recent Activity */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Activity</CardTitle>
                                    <CardDescription>Latest actions and events</CardDescription>
                                </CardHeader>
                                <CardContent className="px-0">
                                    <div className="space-y-4 px-6">
                                        {student.slipRequests.slice(0, 3).map(slip => (
                                            <div key={slip.id} className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium">Slip Request: {slip.reason}</p>
                                                    <p className="text-sm text-muted-foreground">{format(slip.requestDate, 'MMM d, yyyy')}</p>
                                                </div>
                                                <Badge className={getStatusBadgeStyles(slip.status)}>
                                                    {slip.status.charAt(0).toUpperCase() + slip.status.slice(1)}
                                                </Badge>
                                            </div>
                                        ))}

                                        {student.violations.slice(0, 3).map(violation => (
                                            <div key={violation.id} className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium">Violation: {violation.type}</p>
                                                    <p className="text-sm text-muted-foreground">{format(violation.date, 'MMM d, yyyy')}</p>
                                                </div>
                                                <Badge className={getStatusBadgeStyles(violation.status)}>
                                                    {violation.status.charAt(0).toUpperCase() + violation.status.slice(1)}
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Violations Tab */}
                        <TabsContent value="violations" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Violation History</CardTitle>
                                    <CardDescription>
                                        Complete record of student violations
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {student.violations.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500">
                                            No violations found
                                        </div>
                                    ) : (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>Type</TableHead>
                                                    <TableHead>Description</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {student.violations.map(violation => (
                                                    <TableRow key={violation.id}>
                                                        <TableCell>{format(violation.date, 'MMM d, yyyy')}</TableCell>
                                                        <TableCell className="capitalize">{violation.type.replace('_', ' ')}</TableCell>
                                                        <TableCell className="max-w-[200px] truncate">{violation.description}</TableCell>
                                                        <TableCell>
                                                            <Badge className={getStatusBadgeStyles(violation.status)}>
                                                                {violation.status.charAt(0).toUpperCase() + violation.status.slice(1)}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            {violation.status === 'pending' && (
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    onClick={() => handleResolveViolation(violation.id)}
                                                                    disabled={isLoading}
                                                                >
                                                                    Resolve
                                                                </Button>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Slip History Tab */}
                        <TabsContent value="slips" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Slip Request History</CardTitle>
                                    <CardDescription>
                                        Record of all admission slip requests
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {student.slipRequests.length === 0 ? (
                                        <div className="text-center py-8 text-gray-500">
                                            No slip requests found
                                        </div>
                                    ) : (
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Date</TableHead>
                                                    <TableHead>Reason</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Valid Until</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {student.slipRequests.map(slip => (
                                                    <TableRow key={slip.id}>
                                                        <TableCell>{format(slip.requestDate, 'MMM d, yyyy')}</TableCell>
                                                        <TableCell className="max-w-[200px] truncate">{slip.reason}</TableCell>
                                                        <TableCell>
                                                            <Badge className={getStatusBadgeStyles(slip.status)}>
                                                                {slip.status.charAt(0).toUpperCase() + slip.status.slice(1)}
                                                            </Badge>
                                                        </TableCell>
                                                        <TableCell>
                                                            {slip.validUntil ? format(slip.validUntil, 'MMM d, yyyy') : '—'}
                                                        </TableCell>
                                                        <TableCell className="text-right">
                                                            {slip.status === 'pending' && (
                                                                <div className="flex justify-end gap-2">
                                                                    <Button
                                                                        size="sm"
                                                                        variant="outline"
                                                                        onClick={() => handleRejectSlip(slip.id)}
                                                                        disabled={isLoading}
                                                                    >
                                                                        Reject
                                                                    </Button>
                                                                    <Button
                                                                        size="sm"
                                                                        onClick={() => handleApproveSlip(slip.id)}
                                                                        disabled={isLoading}
                                                                    >
                                                                        Approve
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            {/* Edit Profile Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Student Profile</DialogTitle>
                        <DialogDescription>
                            Update student information details
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                defaultValue={student.name}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                defaultValue={student.email}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="studentId" className="text-right">
                                Student ID
                            </Label>
                            <Input
                                id="studentId"
                                defaultValue={student.studentId}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="year" className="text-right">
                                Year Level
                            </Label>
                            <Select defaultValue={student.yearLevel}>
                                <SelectTrigger className="col-span-3">
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="section" className="text-right">
                                Section
                            </Label>
                            <Input
                                id="section"
                                defaultValue={student.section}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">
                                Phone
                            </Label>
                            <Input
                                id="phone"
                                defaultValue={student.contactNumber}
                                className="col-span-3"
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={() => handleUpdateStudent({
                                name: 'Alex Johnson (Updated)',  // In a real app, get values from form
                                email: 'alex.updated@school.edu',
                                section: 'Section A-1'
                            })}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Password Reset Dialog */}
            <Dialog open={isPasswordResetOpen} onOpenChange={setIsPasswordResetOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Reset Student Password</DialogTitle>
                        <DialogDescription>
                            This will send a password reset link to the student's email address.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <p className="text-sm text-muted-foreground mb-4">
                            Send password reset link to:
                        </p>
                        <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={student.avatar} />
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{student.name}</p>
                                <p className="text-sm text-muted-foreground">{student.email}</p>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPasswordResetOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleResetPassword}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Sending...' : 'Send Reset Link'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}