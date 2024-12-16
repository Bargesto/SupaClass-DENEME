import Link from 'next/link'
import { Home, Users, List, BarChart } from 'lucide-react'

const menuItems = [
  { icon: Home, label: 'Ana Sayfa', href: '/teacher' },
  { icon: Users, label: 'Sınıflarım', href: '/teacher/classes' },
  { icon: List, label: 'Öğrenci Listesi', href: '/teacher/students' },
  { icon: BarChart, label: 'Raporlar', href: '/teacher/reports' },
]

export function Sidebar() {
  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-2xl font-bold">SupaClass</h2>
      </div>
      <nav className="flex-1">
        <ul>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="flex items-center p-4 hover:bg-gray-700">
                <item.icon className="mr-2" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

