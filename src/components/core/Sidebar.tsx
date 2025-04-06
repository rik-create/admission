// src/components/core/Sidebar.tsx
'use client'
import { SidebarContent } from './SidebarContent'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function Sidebar({
  role = 'admin',
  collapsed = false,
  onToggleCollapse,
}: {
  role?: 'admin' | 'guard' | 'student',
  collapsed?: boolean,
  onToggleCollapse?: () => void,
}) {
  // Get the title based on role
  const getPortalTitle = () => {
    switch (role) {
      case 'guard': return 'Guard Portal';
      case 'student': return 'Student Portal';
      default: return 'Admin Portal';
    }
  };

  return (
    <div
      className={`hidden md:flex md:flex-col md:flex-shrink-0 md:border-r md:border-gray-200 md:bg-white md:sticky md:top-0 md:h-screen sidebar-transition ${collapsed ? 'md:w-20' : 'md:w-64'}`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <h1 className="text-xl font-bold text-gray-900">{getPortalTitle()}</h1>}
        <button
          onClick={onToggleCollapse}
          className={`rounded-md p-1 text-gray-500 hover:bg-gray-100 focus:outline-none ${collapsed ? 'mx-auto' : 'ml-auto'}`}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      <SidebarContent role={role} collapsed={collapsed} />
    </div>
  )
}