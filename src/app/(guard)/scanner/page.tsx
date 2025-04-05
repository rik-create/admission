'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QRScanner } from '../../../components/guard/QRScanner'
import { Button } from '@/components/ui/button'
import { LightningBoltIcon, KeyboardIcon, ClockIcon, CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons'

export default function ScannerPage() {
    const router = useRouter()
    const [scanResult, setScanResult] = useState<{
        studentId: string
        name: string
        status: 'approved' | 'pending' | 'expired'
        schoolId: string
        picture: string
        schoolIdImage: string
        violationType?: string
    } | null>(null)
    const [torchOn, setTorchOn] = useState(false)

    const handleScan = (data: string | null) => {
        if (data) {
            const status = Math.random() > 0.5 ? 'approved' : 'pending'
            setScanResult({
                studentId: 'STU-2023-0456',
                name: 'Alex Johnson',
                status,
                schoolId: 'SCH-78910',
                picture: '/path/to/sample-image.jpg',
                schoolIdImage: 'https://gratisography.com/wp-content/uploads/2025/03/gratisography-vintage-robot-800x525.jpg',
                violationType: 'Dress code'
            })
        }
    }

    const handleViolation = () => {
        if (scanResult?.violationType) {
            router.push(`/guard/violations/new?studentId=${scanResult.studentId}&violationType=${scanResult.violationType}`)
        }
    }

    return (
        <div className="flex flex-col items-center justify-start h-full w-full px-4">
            {/* Scanner View */}
            {!scanResult && (
                <div className="w-full max-w-md space-y-6">
                    <div className="relative aspect-square border-4 border-blue-500 rounded-lg overflow-hidden">
                        <QRScanner
                            onResult={handleScan}
                            torch={torchOn}
                            className="absolute inset-0 w-full h-full"
                        />
                    </div>

                    <p className="text-center text-gray-600">
                        Align the QR code within the frame to scan
                    </p>

                    <div className="flex justify-center gap-4">
                        <Button variant="outline" onClick={() => setTorchOn(!torchOn)}>
                            <LightningBoltIcon className="mr-2 h-4 w-4" />
                            {torchOn ? 'Turn Off' : 'Turn On'} Torch
                        </Button>
                        <Button variant="outline" onClick={() => router.push('/guard/search')}>
                            <KeyboardIcon className="mr-2 h-4 w-4" />
                            Manual Entry
                        </Button>
                        <Button variant="outline" onClick={() => handleScan('MOCK_DATA')}>
                            Simulate Scan
                        </Button>
                    </div>
                </div>
            )}

            {/* Scan Result View */}
            {scanResult && (
                <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-lg shadow-md">
                    <div className={`text-center p-4 rounded-lg ${scanResult.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : scanResult.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                        {scanResult.status === 'approved' ? (
                            <CheckCircledIcon className="mx-auto h-8 w-8 mb-2" />
                        ) : (
                            <CrossCircledIcon className="mx-auto h-8 w-8 mb-2" />
                        )}
                        <h3 className="font-bold text-lg">
                            {scanResult.status === 'approved'
                                ? 'Approved Slip'
                                : scanResult.status === 'pending'
                                    ? 'Pending Approval'
                                    : 'Expired Slip'}
                        </h3>
                    </div>

                    {/* Student Info Section */}
                    <div className="flex flex-col items-center space-y-4">
                        {/* Display School ID Image */}
                        <div className="w-full flex justify-center">
                            <img src={scanResult.schoolIdImage} alt="School ID" className="w-48 h-auto rounded-lg shadow-md" />
                        </div>
                        <div className="flex justify-between w-full">
                            <span className="text-gray-500">Student Name:</span>
                            <span className="font-medium">{scanResult.name}</span>
                        </div>
                        <div className="flex justify-between w-full">
                            <span className="text-gray-500">Student ID:</span>
                            <span className="font-medium">{scanResult.studentId}</span>
                        </div>



                        {/* Display Violation Type if applicable */}
                        {scanResult.violationType && (
                            <div className="w-full bg-red-100 text-red-800 p-2 rounded-lg text-center">
                                <span className="font-bold">Violation:</span> {scanResult.violationType}
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                        <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => router.push(`/guard/students/${scanResult.studentId}`)}
                        >
                            View History
                        </Button>
                        <Button
                            variant={scanResult.status === 'approved' ? 'outline' : 'destructive'}
                            className="flex-1"
                            disabled={!scanResult.violationType}
                            onClick={handleViolation}
                        >
                            Log Violation
                        </Button>
                    </div>

                    {/* Reject & Scan Again Buttons */}
                    <Button variant="destructive" className="w-full" onClick={() => setScanResult(null)}>
                        Reject
                    </Button>
                    <Button className="w-full mt-2" onClick={() => setScanResult(null)}>
                        Scan Again
                    </Button>
                </div>
            )}
        </div>
    )
}
