// src/components/core/SidebarContent.tsx
'use client'
import Link from 'next/link'
import {
  DashboardIcon,
  GearIcon,
  FileTextIcon,
  ClockIcon,
  PersonIcon,
  ExclamationTriangleIcon
} from "@radix-ui/react-icons"
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"

export function SidebarContent({
  role = 'admin',
  mobile = false,
  collapsed = false
}: {
  role?: 'admin' | 'guard' | 'student'
  mobile?: boolean
  collapsed?: boolean
}) {
  const pathname = usePathname()

  const adminNavItems = [
    {
      name: "Dashboard",
      href: "/admin-dashboard",
      icon: DashboardIcon,
      current: pathname.includes('admin-dashboard')
    },
    {
      name: "Audit Logs",
      href: "/audit-logs",
      icon: FileTextIcon,
      current: pathname.includes('audit-logs')
    },
    {
      name: "Flagged Students",
      href: "/flagged-students",
      icon: ExclamationTriangleIcon,
      current: pathname.includes('flagged-students')
    },
    {
      name: "Duration Settings",
      href: "/duration-settings",
      icon: ClockIcon,
      current: pathname.includes('duration-settings')
    },
    {
      name: "User Management",
      href: "/user-management",
      icon: PersonIcon,
      current: pathname.includes('user-management')
    },
    {
      name: "Admin Settings",
      href: "/admin-settings",
      icon: GearIcon,
      current: pathname.includes('admin-settings')
    }
  ]

  return (
    <>
      {/* Navigation - Removed duplicate header */}
      <div className={`${mobile ? 'pt-2' : collapsed ? 'mt-2' : 'mt-5'} flex-grow flex flex-col`}>
        <nav className="flex-1 px-2 pb-4 space-y-1">
          {adminNavItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  item.current
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  collapsed ? 'justify-center' : 'justify-start',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                )}
                title={collapsed ? item.name : undefined}
              >
                <IconComponent
                  className={cn(
                    item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
                    collapsed ? 'mr-0' : 'mr-3',
                    'flex-shrink-0 h-6 w-6'
                  )}
                  aria-hidden="true"
                />
                {!collapsed && item.name}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}