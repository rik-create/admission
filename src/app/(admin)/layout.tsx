// src/app/(admin)/layout.tsx
'use client'
import { useState, useEffect } from 'react'
import { Sidebar } from "@/components/core/Sidebar"
import { Header } from "@/components/core/Header"
import { MobileSidebar } from "@/components/core/MobileSidebar"
import { Menu, PanelLeftClose, PanelLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [user] = useState({
    name: 'Admin User',
    avatar: '/avatars/admin.png',
    notifications: 5
  })

  // Load saved sidebar preference
  useEffect(() => {
    const savedSidebarState = localStorage.getItem('admin-sidebar-visible')
    if (savedSidebarState !== null) {
      setSidebarVisible(savedSidebarState === 'true')
    }
  }, [])

  // Save sidebar preference when it changes
  useEffect(() => {
    localStorage.setItem('admin-sidebar-visible', String(sidebarVisible))
  }, [sidebarVisible])

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible)
  }

  return (
    <div className={`flex min-h-screen bg-gray-50 text-black ${mobileSidebarOpen ? 'overflow-hidden' : ''}`}>
      {/* Desktop Sidebar - Fixed width and position, conditionally shown */}
      <div 
        className={`hidden md:block fixed h-full overflow-y-auto border-r transition-all duration-300 ${
          sidebarVisible ? 'w-64 opacity-100' : 'w-0 opacity-0'
        }`}
      >
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

      {/* Main content area with dynamic sidebar offset on desktop */}
      <div className={`flex-1 flex flex-col w-full transition-all duration-300 ${sidebarVisible ? 'md:ml-64' : 'md:ml-0'}`}>
        {/* Hide header when sidebar is open on mobile */}
        {!mobileSidebarOpen && (
          <Header user={user}>
            <div className="flex items-center gap-2">
              {/* Mobile sidebar toggle */}
              <button 
                type="button"
                className="md:hidden p-2 rounded-md text-gray-700"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              
              {/* Desktop sidebar toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="hidden md:flex"
                onClick={toggleSidebar}
                title={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
              >
                {sidebarVisible ? 
                  <PanelLeftClose className="h-5 w-5" /> : 
                  <PanelLeft className="h-5 w-5" />
                }
              </Button>
            </div>
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