import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <h1 className="text-4xl font-bold text-white mb-8">SupaClass</h1>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/teacher">Öğretmen Girişi</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link href="/parent">Veli Girişi</Link>
        </Button>
      </div>
    </div>
  )
}

