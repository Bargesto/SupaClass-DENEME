'use client'

import { useState, useEffect } from 'react'
import { TeacherLayout } from '@/components/TeacherLayout'
import { StudentList } from '@/components/StudentList'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"

type Announcement = {
  id: string
  content: string
  date: string
}

export default function ClassPage({ params }: { params: { id: string } }) {
  const [className, setClassName] = useState('')
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [newAnnouncement, setNewAnnouncement] = useState('')
  const [students, setStudents] = useState([]); // Added state for students

  useEffect(() => {
    const savedClasses = JSON.parse(localStorage.getItem('classes') || '[]')
    const currentClass = savedClasses.find((c: any) => c.id === params.id)
    if (currentClass) {
      setClassName(currentClass.name)
      setStudents(currentClass.students); // Initialize students from local storage
    }

    const savedAnnouncements = JSON.parse(localStorage.getItem(`announcements_${params.id}`) || '[]')
    setAnnouncements(savedAnnouncements)
  }, [params.id])

  const addAnnouncement = () => {
    if (newAnnouncement.trim()) {
      const announcement: Announcement = {
        id: Date.now().toString(),
        content: newAnnouncement,
        date: new Date().toISOString()
      }
      const updatedAnnouncements = [...announcements, announcement]
      setAnnouncements(updatedAnnouncements)
      localStorage.setItem(`announcements_${params.id}`, JSON.stringify(updatedAnnouncements))
      setNewAnnouncement('')
    }
  }

  return (
    <TeacherLayout>
      <h1 className="text-3xl font-bold mb-6">Sınıf: {className}</h1>
    
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Öğrenciler</h2>
        <Grid className="grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {students.map((student) => (
            <Card key={student.id} className="flex flex-col items-center p-4">
              <img src={student.avatar} alt={student.name} className="w-20 h-20 rounded-full mb-2" />
              <h3 className="font-semibold text-center">{student.name}</h3>
              <p className="text-lg font-bold">{student.points} puan</p>
            </Card>
          ))}
        </Grid>
      </div>

      <StudentList classId={params.id} />
    
      <Card className="mt-6 bg-red-100">
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
          <div className="mt-4 flex space-x-2">
            <Input
              value={newAnnouncement}
              onChange={(e) => setNewAnnouncement(e.target.value)}
              placeholder="Yeni duyuru ekle..."
            />
            <Button onClick={addAnnouncement}>Ekle</Button>
          </div>
        </CardContent>
      </Card>
    </TeacherLayout>
  )
}

