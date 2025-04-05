// src/app/(student)/settings/page.tsx
'use client'

import { useState } from 'react'
import { 
  Avatar,
  AvatarImage,
  AvatarFallback 
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import * as Switch from '@radix-ui/react-switch'
import * as Slider from '@radix-ui/react-slider'
import { 
  SunIcon, 
  MoonIcon,
  FontStyleIcon,
  ExitIcon,
  IdCardIcon,
  UploadIcon,
  TrashIcon,
  EyeOpenIcon
} from '@radix-ui/react-icons'

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [showConfirm, setShowConfirm] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [hasSchoolID, setHasSchoolID] = useState(true)

  const handleUpload = () => {
    // Mock upload progress
    setUploadProgress(0)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setHasSchoolID(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleFontSizeChange = (value: number[]) => {
    if (value[0] < 33) setFontSize('small')
    else if (value[0] < 66) setFontSize('medium')
    else setFontSize('large')
  }

  return (
<div className="max-w-md mx-auto p-6 pb-0">
{/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-xl font-bold mb-1">Settings</h1>
        <p className="text-gray-500">Customize your experience and manage security</p>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mb-8">
        <Avatar className="h-20 w-20 mb-4 cursor-pointer">
          <AvatarImage src="/avatars/student.png" />
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>
        <Button variant="outline" size="sm">
          Edit Profile Picture
        </Button>
      </div>

      {/* School ID Management */}
      <div className="mb-8">
        <h2 className="font-medium mb-4 flex items-center gap-2">
          <IdCardIcon className="h-5 w-5" />
          School ID Management
        </h2>
        
        {hasSchoolID ? (
          <div className="space-y-4">
            <div className="border rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">Current ID</p>
                <p className="text-sm text-gray-500">ID_2023_0456.pdf</p>
              </div>
              <Button variant="outline" size="sm">
                <EyeOpenIcon className="mr-2 h-4 w-4" />
                View
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={handleUpload}>
                <UploadIcon className="mr-2 h-4 w-4" />
                Upload New
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 text-red-500"
                onClick={() => setShowConfirm(true)}
              >
                <TrashIcon className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <p className="text-gray-500 mb-4">No School ID uploaded</p>
            <Button onClick={handleUpload}>
              <UploadIcon className="mr-2 h-4 w-4" />
              Upload School ID
            </Button>
          </div>
        )}

        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500" 
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Uploading... {uploadProgress}%</p>
          </div>
        )}
      </div>

      {/* Appearance & Theme */}
      <div className="mb-8">
        <h2 className="font-medium mb-4">Appearance & Theme</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              {darkMode ? (
                <MoonIcon className="h-5 w-5" />
              ) : (
                <SunIcon className="h-5 w-5" />
              )}
              <span>Dark Mode</span>
            </div>
            <Switch.Root
              className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-black"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
            </Switch.Root>
          </div>
          
          <div className="p-3 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FontStyleIcon className="h-5 w-5" />
                <span>Font Size</span>
              </div>
              <span className="text-sm text-gray-500 capitalize">{fontSize}</span>
            </div>
            <Slider.Root 
              defaultValue={[50]}
              max={100}
              step={1}
              className="relative flex items-center select-none touch-none w-full h-5"
              onValueChange={handleFontSizeChange}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
                <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </Slider.Root>
          </div>
        </div>
      </div>

      {/* Security & Privacy */}
      <div className="mb-8">
        <h2 className="font-medium mb-4">Security & Privacy</h2>
        <Button variant="destructive" className="w-full gap-2">
          <ExitIcon className="h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="font-bold text-lg mb-2">Remove School ID</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to remove your School ID?</p>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={() => {
                  setHasSchoolID(false)
                  setShowConfirm(false)
                }}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}