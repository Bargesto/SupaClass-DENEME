'use client'

import { useState, useEffect } from 'react'
import { TeacherLayout } from '@/components/TeacherLayout'

type Student = {
  id: string
  name: string
  avatar: string
  points: number
  className: string
}

export default function AllStudentsPage() {
  const [allStudents, setAllStudents] = useState<Student[]>([])

  useEffect(() => {
    const classes = JSON.parse(localStorage.getItem('classes') || '[]')
    let students: Student[] = []

    classes.forEach((classItem: any) => {
      const classStudents = JSON.parse(localStorage.getItem(`students_${classItem.id}`) || '[]')
      students = students.concat(classStudents.map((student: any) => ({
        ...student,
        className: classItem.name
      })))
    })

    students.sort((a, b) => b.points - a.points)
    setAllStudents(students)
  }, [])

  return (
    <TeacherLayout>
      <h1 className="text-3xl font-bold mb-6">Tüm Öğrenciler</h1>
      <ul>
        {allStudents.map((student, index) => (
          <li key={student.id} className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <span className="font-bold mr-4">{index + 1}.</span>
              <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full mr-4" />
              <div>
                <span className="font-semibold">{student.name}</span>
                <span className="text-sm text-gray-500 ml-2">({student.className})</span>
              </div>
            </div>
            <span className="font-bold">{student.points} puan</span>
          </li>
        ))}
      </ul>
    </TeacherLayout>
  )
}

