'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Student = {
  id: string
  name: string
  avatar: string
  points: number
}

type Announcement = {
  id: string
  content: string
  date: string
}

export default function ParentClassView({ params }: { params: { id: string } }) {
  const [students, setStudents] = useState<Student[]>([])
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [className, setClassName] = useState('')

  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem(`students_${params.id}`) || '[]')
    setStudents(savedStudents)

    const savedAnnouncements = JSON.parse(localStorage.getItem(`announcements_${params.id}`) || '[]')
    setAnnouncements(savedAnnouncements)

    const savedClasses = JSON.parse(localStorage.getItem('classes') || '[]')
    const currentClass = savedClasses.find((c: any) => c.id === params.id)
    if (currentClass) {
      setClassName(currentClass.name)
    }
  }, [params.id])

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Sınıf: {className}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-red-100">
          <CardHeader>
            <CardTitle>Duyurular</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="p-2 bg-white rounded">
                  <p>{announcement.content}</p>
                  <p className="text-sm text-gray-500">{new Date(announcement.date).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Öğrenci Puanları</CardTitle>
          </CardHeader>
          <CardContent>
            <ul>
              {students.map(student => (
                <li key={student.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                  <div className="flex items-center">
                    <img src={student.avatar} alt={student.name} className="w-8 h-8 rounded-full mr-2" />
                    <span>{student.name}</span>
                  </div>
                  <span className="font-bold">{student.points} puan</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

