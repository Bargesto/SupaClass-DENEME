'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { generateAvatar } from '@/utils/generateAvatar'

type Student = {
  id: string
  name: string
  avatar: string
  points: number
}

export default function ClassPage({ params }: { params: { id: string } }) {
  const [students, setStudents] = useState<Student[]>([])
  const [newStudentName, setNewStudentName] = useState('')
  const [announcements, setAnnouncements] = useState<string[]>([])
  const [newAnnouncement, setNewAnnouncement] = useState('')

  const addStudent = () => {
    if (newStudentName) {
      setStudents([...students, { 
        id: Date.now().toString(), 
        name: newStudentName, 
        avatar: generateAvatar(),
        points: 0
      }])
      setNewStudentName('')
    }
  }

  const addAnnouncement = () => {
    if (newAnnouncement) {
      setAnnouncements([...announcements, newAnnouncement])
      setNewAnnouncement('')
    }
  }

  const updatePoints = (studentId: string, amount: number) => {
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, points: s.points + amount } : s
    ))
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Sınıf: {params.id}</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Öğrenciler</h2>
        <div className="flex mb-4">
          <Input
            type="text"
            placeholder="Yeni öğrenci adı"
            value={newStudentName}
            onChange={(e) => setNewStudentName(e.target.value)}
            className="mr-2"
          />
          <Button onClick={addStudent}>Öğrenci Ekle</Button>
        </div>
        <ul>
          {students.map(student => (
            <li key={student.id} className="flex items-center justify-between p-2 border-b">
              <div className="flex items-center">
                <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full mr-2" />
                <span>{student.name} - {student.points} puan</span>
              </div>
              <div>
                <Button onClick={() => updatePoints(student.id, 1)} className="mr-2">+1</Button>
                <Button onClick={() => updatePoints(student.id, -1)} variant="destructive">-1</Button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Duyurular</h2>
        <div className="flex mb-4">
          <Input
            type="text"
            placeholder="Yeni duyuru"
            value={newAnnouncement}
            onChange={(e) => setNewAnnouncement(e.target.value)}
            className="mr-2"
          />
          <Button onClick={addAnnouncement}>Duyuru Ekle</Button>
        </div>
        <ul>
          {announcements.map((announcement, index) => (
            <li key={index} className="p-2 border-b">{announcement}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

