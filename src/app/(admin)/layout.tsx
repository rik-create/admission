// src/app/(admin)/layout.tsx
'use client'
import { useState } from 'react'
import { Header } from "@/components/core/Header"
import { MobileSidebar } from "@/components/core/MobileSidebar"
import { Sidebar } from "@/components/core/Sidebar"
import { Menu } from 'lucide-react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [user] = useState({
    name: 'Admin User',
    avatar: '/avatars/admin.png',
    notifications: 5
  })

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className={`flex min-h-screen bg-gray-50 text-black ${mobileSidebarOpen ? 'overflow-hidden' : ''}`}>
      {/* Desktop Sidebar - Only visible on md+ screens */}
      <Sidebar
        role="admin"
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />

      {/* Mobile Sidebar - Only visible on small screens */}
      <MobileSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        role="admin"
      />

      {/* Subtle blur overlay when mobile sidebar is open */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-30 backdrop-blur-[1px] bg-black/10 md:hidden" />
      )}

      {/* Main content area - Adjusted to accommodate sidebar on larger screens */}
      <div className="flex-1 flex flex-col w-full transition-all duration-300">
        {/* Show header unless mobile sidebar is open */}
        {!mobileSidebarOpen && (
          <Header user={user}>
            {/* Mobile sidebar toggle - Only visible on mobile */}
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