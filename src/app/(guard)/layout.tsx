// src/app/(guard)/layout.tsx
'use client'

import { useState } from 'react'
import { BottomNav } from "@/components/core/BottomNav"
import { Header } from "@/components/core/Header"

export default function GuardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [guard] = useState({
    name: 'Officer Smith',
    avatar: '/avatars/guard.png',
    notifications: 2,
    badgeNumber: 'G-2023-0456'
  })

  const [activeTab, setActiveTab] = useState('scanner')

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-black">
      <Header 
        user={{
          name: guard.name,
          avatar: guard.avatar,
          notifications: guard.notifications,
          badgeNumber: guard.badgeNumber
        }}
      />

      <main className="flex-1 pb-16 pt-4">
        {children}
      </main>

      <BottomNav 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        role="guard"

      />
    </div>
  )
}