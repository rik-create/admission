// src/app/(student)/notifications/page.tsx
'use client'

import { useState } from 'react'
import { BellIcon, CheckIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

type NotificationType = 'slip' | 'violation' | 'system' | 'reminder' | 'alert'

interface Notification {
  id: string
  title: string
  message: string
  date: string
  read: boolean
  type: NotificationType
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Slip Approved',
      message: 'Your request for Oct 15 has been approved',
      date: '2023-10-10T09:30:00',
      read: false,
      type: 'slip'
    },
    {
      id: '2',
      title: 'Violation Recorded',
      message: 'Late return on Oct 12 at 4:15 PM',
      date: '2023-10-12T16:20:00',
      read: false,
      type: 'violation'
    },
    {
      id: '3',
      title: 'System Maintenance',
      message: 'Planned maintenance this Saturday 2-4 AM',
      date: '2023-10-09T14:00:00',
      read: true,
      type: 'system'
    },
    // Added 5 new notifications
    {
      id: '4',
      title: 'Slip Expiring Soon',
      message: 'Your current slip expires in 2 days',
      date: '2023-10-13T08:15:00',
      read: false,
      type: 'reminder'
    },
    {
      id: '5',
      title: 'New Violation',
      message: 'Unauthorized area access on Oct 14',
      date: '2023-10-14T11:45:00',
      read: false,
      type: 'violation'
    },
    {
      id: '6',
      title: 'Campus Alert',
      message: 'Heavy rain expected tomorrow - carry umbrella',
      date: '2023-10-15T07:30:00',
      read: true,
      type: 'alert'
    },
    {
      id: '7',
      title: 'Slip Rejected',
      message: 'Your request for Nov 1 was not approved',
      date: '2023-10-16T13:20:00',
      read: false,
      type: 'slip'
    },
    {
      id: '8',
      title: 'Reminder',
      message: 'Parent-teacher meeting scheduled for Friday',
      date: '2023-10-17T09:00:00',
      read: true,
      type: 'reminder'
    }
  ])

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n: Notification) => 
      n.id === id ? {...n, read: true} : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n: Notification) => ({...n, read: true})))
  }

  const unreadCount = notifications.filter((n: Notification) => !n.read).length

  // Get border color based on notification type
  const getBorderColor = (type: NotificationType) => {
    switch(type) {
      case 'slip': return 'border-green-200'
      case 'violation': return 'border-red-200'
      case 'system': return 'border-blue-200'
      case 'alert': return 'border-yellow-200'
      case 'reminder': return 'border-purple-200'
      default: return 'border-gray-200'
    }
  }

  return (
    <div className="pt-2 px-4 pb-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BellIcon className="h-6 w-6" />
          Notifications
          {unreadCount > 0 && (
            <span className="bg-blue-500 text-white text-sm px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </h1>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
        >
          Mark all as read
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No notifications yet
          </div>
        ) : (
          notifications.map((notification: Notification) => (
            <div 
              key={notification.id}
              className={`p-4 rounded-lg border ${notification.read ? 'bg-gray-50' : 'bg-white'} ${getBorderColor(notification.type)}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-gray-600">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notification.date).toLocaleString()}
                  </p>
                </div>
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <CheckIcon className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}