import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admission Slip System',
  description: 'Manage student admission slips',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}