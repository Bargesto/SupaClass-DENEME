'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from 'next/navigation'

export default function ParentLogin() {
  const [classId, setClassId] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (classId) {
      router.push(`/parent/class/${classId}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <h1 className="text-3xl font-bold text-white mb-8">Veli Girişi</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <Input
          type="text"
          placeholder="Sınıf ID'si giriniz"
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="mb-4"
        />
        <Button type="submit" className="w-full">Giriş</Button>
      </form>
    </div>
  )
}

