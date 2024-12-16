'use client'

import { useState, useEffect } from 'react'
import { TeacherLayout } from '@/components/TeacherLayout'
import { PointHistoryChart } from '@/components/PointHistoryChart'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type PointHistory = {
  date: string
  points: number
}

type Class = {
  id: string
  name: string
}

type Student = {
  id: string
  name: string
  points: number
}

export default function ReportsPage() {
  const [classes, setClasses] = useState<Class[]>([])
  const [selectedClass, setSelectedClass] = useState<string | null>(null)
  const [students, setStudents] = useState<Student[]>([])
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [classHistory, setClassHistory] = useState<PointHistory[]>([])
  const [studentHistory, setStudentHistory] = useState<PointHistory[]>([])

  useEffect(() => {
    const savedClasses = JSON.parse(localStorage.getItem('classes') || '[]')
    setClasses(savedClasses)
  }, [])

  useEffect(() => {
    if (selectedClass) {
      const savedStudents = JSON.parse(localStorage.getItem(`students_${selectedClass}`) || '[]')
      setStudents(savedStudents)
      setSelectedStudent(null)

      // Generate mock data for class history
      const mockClassHistory = generateMockHistory(14)
      setClassHistory(mockClassHistory)
    }
  }, [selectedClass])

  useEffect(() => {
    if (selectedStudent) {
      // Generate mock data for student history
      const mockStudentHistory = generateMockHistory(14)
      setStudentHistory(mockStudentHistory)
    }
  }, [selectedStudent])

  const generateMockHistory = (days: number): PointHistory[] => {
    const history: PointHistory[] = []
    const today = new Date()
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      history.push({
        date: date.toISOString().split('T')[0],
        points: Math.floor(Math.random() * 100)
      })
    }
    return history
  }

  return (
    <TeacherLayout>
      <h1 className="text-3xl font-bold mb-6">Raporlar</h1>
      <div className="mb-4">
        <Select onValueChange={(value) => setSelectedClass(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sınıf seçin" />
          </SelectTrigger>
          <SelectContent>
            {classes.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedClass && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Sınıf Puan Geçmişi</h2>
          <PointHistoryChart history={classHistory} title="Sınıf 2 Haftalık Puan Geçmişi" />
        </div>
      )}
      {selectedClass && (
        <div className="mb-4">
          <Select onValueChange={(value) => setSelectedStudent(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Öğrenci seçin" />
            </SelectTrigger>
            <SelectContent>
              {students.map((s) => (
                <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      {selectedStudent && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Öğrenci Puan Geçmişi</h2>
          <PointHistoryChart history={studentHistory} title="Öğrenci 2 Haftalık Puan Geçmişi" />
        </div>
      )}
    </TeacherLayout>
  )
}

