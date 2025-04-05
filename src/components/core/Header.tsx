// src/components/core/Header.tsx
'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Settings, Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  user?: {
    name: string
    avatar: string
    notifications: number
  }
  children?: React.ReactNode
}

export function Header({ user, children }: HeaderProps) {
  const router = useRouter()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Left side - Children (menu button) or title */}
        <div className="flex items-center gap-4">
          {children || (
            <h1 className="text-lg font-semibold text-gray-900">
              Admin Portal
            </h1>
          )}
        </div>

        {/* Right side - User controls */}
        {user && (
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {user.notifications > 0 && (
                <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                  {user.notifications}
                </span>
              )}
            </Button>

            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                className="p-0"
                onClick={() => router.push('admin-settings')}
              >
                <span className="text-sm font-medium">
                  {user.name}
                </span>
                <Settings className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}