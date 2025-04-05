// src/app/(student)/qr-code/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { RotateCwIcon } from 'lucide-react'

type SlipStatus = 'none' | 'active' | 'pending' | 'rejected'

export default function QRCodePageContent() {
  const [qrCode, setQrCode] = useState<string>('')
  const [slipStatus, setSlipStatus] = useState<SlipStatus>('active') // Mock status
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Mock student data - replace with real data from your API
  const studentInfo = {
    name: 'Erick Reyes',
    id: '02000288017    ',
    validity: 'Oct 15, 2023 - Nov 15, 2023'
  }

  // Generate QR code - replace with real QR generation logic
  const generateQrCode = () => {
    setIsRefreshing(true)
    // Simulate API call
    setTimeout(() => {
      setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${Date.now()}`)
      setIsRefreshing(false)
    }, 800)
  }

  useEffect(() => {
    generateQrCode()
  }, [])

  // Status badge styling
  const getStatusStyle = (status: SlipStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-8">
      {/* Status Badge */}
      <div className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusStyle(slipStatus)}`}>
        {slipStatus === 'none' && 'No active slip'}
        {slipStatus === 'active' && 'Active slip'}
        {slipStatus === 'pending' && 'Pending approval'}
        {slipStatus === 'rejected' && 'Slip rejected'}
      </div>

      {/* QR Code Display */}
      {slipStatus === 'active' ? (
        <div className="flex flex-col items-center space-y-6">
          <div className="p-4 bg-white rounded-lg shadow-md">
            {qrCode ? (
              <img 
                src={qrCode} 
                alt="Student QR Code"
                className="w-64 h-64"
              />
            ) : (
              <div className="w-64 h-64 flex items-center justify-center bg-gray-100">
                <p>Generating QR code...</p>
              </div>
            )}
          </div>

          {/* Student Info */}
          <div className="text-center space-y-2">
            <p className="text-lg font-semibold">{studentInfo.name}</p>
            <p className="text-gray-600">ID: {studentInfo.id}</p>
            <p className="text-gray-600">Valid: {studentInfo.validity}</p>
          </div>

          {/* Refresh Button */}
          <Button
            onClick={generateQrCode}
            disabled={isRefreshing}
            variant="outline"
          >
            <RotateCwIcon className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh QR'}
          </Button>
        </div>
      ) : (
        <div className="text-center p-8 bg-gray-50 rounded-lg max-w-md">
          <p className="text-gray-600">
            {slipStatus === 'pending'
              ? 'Your slip request is under review'
              : slipStatus === 'rejected'
                ? 'Your slip request was not approved'
                : 'You currently have no active slip'}
          </p>
          {slipStatus === 'none' && (
            <Button className="mt-4" asChild>
              <a href="/student/request-slip">Request New Slip</a>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}