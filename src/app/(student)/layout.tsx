// src/app/(student)/layout.tsx
'use client'
import { useState } from 'react'
import { BottomNav } from "@/components/core/BottomNav"
import { Header } from "@/components/core/Header"
import { 
  Avatar,
  AvatarImage,
  AvatarFallback
} from "@/components/ui/avatar"

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // State for user data (replace with actual user context/API)
  const [user] = useState({
    name: 'Erick Student',
    avatar: '/avatars/student.png',
    notifications: 3
  })

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      {/* Header with user info */}
      <Header 
        user={user}
      />

      {/* Main Content with padding for header and bottom nav */}
      <main className="flex-1 pb-15 pt-4"> 
        {children}
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}