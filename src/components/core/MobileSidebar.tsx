// src/components/core/MobileSidebar.tsx
'use client'
import { X } from 'lucide-react'
import { SidebarContent } from './SidebarContent'

export function MobileSidebar({
  open = false,
  onClose,
  role = 'admin'
}: {
  open: boolean
  onClose: () => void
  role?: 'admin' | 'guard' | 'student'
}) {
  return (
    <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg sidebar-transition mobile-sidebar ${open ? 'open' : ''}`}>
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold">Admin Portal</h1>
        <button
          type="button"
          className="rounded-md text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <SidebarContent role={role} mobile />
    </div>
  )
}