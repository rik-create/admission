// src/app/(admin)/layout.tsx
'use client'
import { useState } from 'react'
import { Sidebar } from "@/components/core/Sidebar"
import { Header } from "@/components/core/Header"
import { MobileSidebar } from "@/components/core/MobileSidebar"
import { Menu } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [user] = useState({
    name: 'Admin User',
    avatar: '/avatars/admin.png',
    notifications: 5
  })

  return (
    <div className={`flex min-h-screen bg-gray-50 text-black ${mobileSidebarOpen ? 'overflow-hidden' : ''}`}>
      {/* Desktop Sidebar - Fixed width and position */}
      <div className="hidden md:block md:w-64 fixed h-full overflow-y-auto border-r">
        <Sidebar role="admin" />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar 
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        role="admin"
      />

      {/* Subtle blur overlay when mobile sidebar is open */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-30 backdrop-blur-[1px] bg-black/10 md:hidden" />
      )}

      {/* Main content area with sidebar offset on desktop */}
      <div className="flex-1 flex flex-col w-full md:ml-64">
        {/* Hide header when sidebar is open on mobile */}
        {!mobileSidebarOpen && (
          <Header user={user}>
            <button 
              type="button"
              className="md:hidden p-2 rounded-md text-gray-700"
              onClick={() => setMobileSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </Header>
        )}

        {/* Main content with responsive padding */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden">
          <div className="max-w-full overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}