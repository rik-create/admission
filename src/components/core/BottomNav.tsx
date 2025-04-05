// src/components/core/BottomNav.tsx
'use client'

import { Button } from "@/components/ui/button"
import { 
  DashboardIcon, 
  CameraIcon, 
  MagnifyingGlassIcon,
  FileTextIcon,
  HomeIcon,
  CodeIcon,
  BellIcon
} from "@radix-ui/react-icons"
import { useRouter } from 'next/navigation'

interface NavItem {
  id: string
  icon: string
  label: string
  path: string // Added path for explicit routing
}

interface BottomNavProps {
  activeTab?: string
  setActiveTab?: (tab: string) => void
  navItems?: NavItem[]
  role?: 'student' | 'guard' | 'admin' // Added role prop
}

// Complete icon mapping
const iconComponents: Record<string, React.ComponentType<any>> = {
  DashboardIcon: DashboardIcon,
  ScanIcon: CameraIcon,
  SearchIcon: MagnifyingGlassIcon,
  AlertIcon: BellIcon,
  ReportIcon: FileTextIcon,
  HomeIcon: HomeIcon,
  FileTextIcon: FileTextIcon,
  CodeIcon: CodeIcon,
  BellIcon: BellIcon
}

export function BottomNav({ 
  activeTab, 
  setActiveTab, 
  role = 'student', // Default to student
  navItems = role === 'guard' 
    ? [
        { id: 'scanner', icon: 'ScanIcon', label: 'Scanner', path: 'scanner' },
        { id: 'search', icon: 'SearchIcon', label: 'Search', path: 'search' },
        { id: 'violations', icon: 'ReportIcon', label: 'Violations', path: 'violations' }
      ]
    : [
        { id: 'student_dashboard', icon: 'HomeIcon', label: 'Home', path: 'student_dashboard' },
        { id: 'request-slip', icon: 'FileTextIcon', label: 'Request', path: 'request-slip' },
        { id: 'qr-code', icon: 'CodeIcon', label: 'QR', path: 'qr-code' },
        { id: 'student-notif', icon: 'BellIcon', label: 'Notifications', path: 'student-notif' }
      ]
}: BottomNavProps) {
  const router = useRouter()
  
  const handleNavigation = (item: NavItem) => {
    console.log("Navigating to:", item.path);
    if (setActiveTab) {
      setActiveTab(item.id);
    }
    router.push(`/${item.path}`);
  };
  

  return (
    <nav className="fixed bottom-0 z-50 w-full border-t border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const IconComponent = iconComponents[item.icon] || HomeIcon
          return (
            <Button 
              key={item.id}
              variant={activeTab === item.id ? 'default' : 'ghost'} 
              className={`flex-col h-full ${activeTab === item.id ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-black'}`}
              onClick={() => handleNavigation(item)}
            >
              {IconComponent && <IconComponent className="h-5 w-5" />}
              <span className="text-xs">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
