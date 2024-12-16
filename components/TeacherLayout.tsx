import { ReactNode } from 'react'
import Link from 'next/link'
import { Home, Users, BarChart, LogOut, UserPlus, School } from 'lucide-react'

const menuItems = [
  { icon: Home, href: '/teacher' },
  { icon: Users, href: '/teacher/classes' },
  { icon: UserPlus, href: '/teacher/all-students' },
  { icon: BarChart, href: '/teacher/reports' },
]

export function TeacherLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <aside className="w-16 bg-blue-600 text-white flex flex-col items-center py-4">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} className="p-3 hover:bg-blue-700 rounded-lg mb-2">
            <item.icon className="w-6 h-6" />
          </Link>
        ))}
        <div className="flex-grow" />
        <Link href="/logout" className="p-3 hover:bg-blue-700 rounded-lg">
          <LogOut className="w-6 h-6" />
        </Link>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md p-4 flex items-center">
          <School className="w-6 h-6 mr-2 text-blue-600" />
          <h1 className="text-2xl font-bold">SupaClass</h1>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

