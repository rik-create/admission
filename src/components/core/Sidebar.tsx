// src/components/core/Sidebar.tsx
'use client'
import { SidebarContent } from './SidebarContent'

export function Sidebar({
  role = 'admin',
  collapsed = false
}: {
  role?: 'admin' | 'guard' | 'student',
  collapsed?: boolean
}) {
  // Removed all md: classes that were making this display on desktop by default
  return (
    <div className="flex flex-col flex-grow border-r border-gray-200 bg-white overflow-y-auto h-full">
      <SidebarContent role={role} collapsed={collapsed} />
    </div>
  )
}