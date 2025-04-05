// src/components/core/Sidebar.tsx
'use client'
import { SidebarContent } from './SidebarContent'

export function Sidebar({ role = 'admin' }: { role?: 'admin' | 'guard' | 'student' }) {
  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow border-r border-gray-200 bg-white overflow-y-auto">
        <SidebarContent role={role} />
      </div>
    </div>
  )
}