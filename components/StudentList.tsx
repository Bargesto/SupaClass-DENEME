'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash, ThumbsUp, ThumbsDown, Shuffle, Users } from 'lucide-react'
import { generateAvatar } from '@/utils/generateAvatar'
import { generateStudentId } from '@/utils/generateId'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from 'react-hot-toast'

type Student = {
  id: string
  name: string
  avatar: string
  points: number
}

type Behavior = {
  id: string
  description: string
  points: number
}

const positiveBehaviors: Behavior[] = [
  { id: 'p1', description: 'Aktif katılım', points: 2 },
  { id: 'p2', description: 'Yardımseverlik', points: 2 },
  { id: 'p3', description: 'Ödev tamamlama', points: 1 },
]

const negativeBehaviors: Behavior[] = [
  { id: 'n1', description: 'Derse geç kalma', points: -1 },
  { id: 'n2', description: 'Ders bozma', points: -2 },
  { id: 'n3', description: 'Ödev yapmama', points: -1 },
]

export function StudentList({ classId }: { classId: string }) {
  const [students, setStudents] = useState<Student[]>([])
  const [newStudentName, setNewStudentName] = useState('')
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)

  useEffect(() => {
    const savedStudents = localStorage.getItem(`students_${classId}`)
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents))
    }
  }, [classId])

  useEffect(() => {
    localStorage.setItem(`students_${classId}`, JSON.stringify(students))
  }, [classId, students])

  const addStudent = () => {
    if (newStudentName) {
      const newStudent: Student = {
        id: generateStudentId(),
        name: newStudentName,
        avatar: generateAvatar(newStudentName),
        points: 0
      }
      setStudents([...students, newStudent])
      setNewStudentName('')
    }
  }

  const deleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id))
  }

  const startEditing = (student: Student) => {
    setEditingStudent(student)
    setNewStudentName(student.name)
  }

  const saveEdit = () => {
    if (editingStudent && newStudentName) {
      setStudents(students.map(s => 
        s.id === editingStudent.id ? { ...s, name: newStudentName, avatar: generateAvatar(newStudentName) } : s
      ))
      setEditingStudent(null)
      setNewStudentName('')
    }
  }

  const updatePoints = (studentId: string, points: number) => {
    setStudents(students.map(s => 
      s.id === studentId ? { ...s, points: s.points + points } : s
    ))
    toast.success(`${points > 0 ? '+' : ''}${points} puan verildi!`)
  }

  const selectRandomStudent = () => {
    if (students.length > 0) {
      const randomStudent = students[Math.floor(Math.random() * students.length)]
      toast.success(`Rastgele seçilen öğrenci: ${randomStudent.name}`)
    } else {
      toast.error('Sınıfta öğrenci yok!')
    }
  }

  const assignBulkPoints = (points: number) => {
    setStudents(students.map(s => ({ ...s, points: s.points + points })))
    toast.success(`Tüm öğrencilere ${points > 0 ? '+' : ''}${points} puan verildi!`)
  }

  return (
    <div>
      <div className="flex mb-4">
        <Input
          type="text"
          placeholder="Yeni öğrenci adı"
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
          className="mr-2"
        />
        {editingStudent ? (
          <Button onClick={saveEdit}>Kaydet</Button>
        ) : (
          <Button onClick={addStudent}><Plus className="mr-2" /> Ekle</Button>
        )}
      </div>
      <div className="flex mb-4 space-x-2">
        <Button onClick={selectRandomStudent}><Shuffle className="mr-2" /> Rastgele Öğrenci</Button>
        <Button onClick={() => assignBulkPoints(1)}><Users className="mr-2" /> Toplu +1 Puan</Button>
        <Button onClick={() => assignBulkPoints(-1)} variant="destructive"><Users className="mr-2" /> Toplu -1 Puan</Button>
      </div>
      <ul>
        {students.map(student => (
          <li key={student.id} className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full mr-4" />
              <span className="font-semibold">{student.name}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-4 font-bold">{student.points} puan</span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="mr-2">Davranış</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{student.name} - Davranış Puanı</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Olumlu Davranışlar</h4>
                      {positiveBehaviors.map(behavior => (
                        <Button 
                          key={behavior.id} 
                          onClick={() => updatePoints(student.id, behavior.points)}
                          className="w-full mb-2"
                          variant="outline"
                        >
                          <ThumbsUp className="mr-2 h-4 w-4 text-green-500" /> {behavior.description} (+{behavior.points})
                        </Button>
                      ))}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Olumsuz Davranışlar</h4>
                      {negativeBehaviors.map(behavior => (
                        <Button 
                          key={behavior.id} 
                          onClick={() => updatePoints(student.id, behavior.points)}
                          className="w-full mb-2"
                          variant="outline"
                        >
                          <ThumbsDown className="mr-2 h-4 w-4 text-red-500" /> {behavior.description} ({behavior.points})
                        </Button>
                      ))}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="icon" onClick={() => startEditing(student)}><Edit className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" onClick={() => deleteStudent(student.id)}><Trash className="h-4 w-4" /></Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

