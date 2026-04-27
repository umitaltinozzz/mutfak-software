import { ReactNode } from 'react'
import DashboardSidebar from '@/components/DashboardSidebar'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Premium Dashboard Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-900 dark:via-blue-950/30 dark:to-purple-950/20"></div>
        
        {/* Floating geometric shapes for premium feel */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Dashboard Sidebar */}
      <DashboardSidebar />

      {/* Dashboard Content with sidebar offset */}
      <main className="relative z-10 lg:pl-72">
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  )
} 