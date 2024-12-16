'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash, Copy, User, Star } from 'lucide-react'
import Link from 'next/link'
import { generateClassId } from '@/utils/generateId'
import { toast } from 'react-hot-toast'

type Class = {
  id: string
  name: string
  color: string
}

const colors = ['bg-red-200', 'bg-blue-200', 'bg-green-200', 'bg-yellow-200', 'bg-purple-200', 'bg-pink-200']

export function ClassList() {
  const [classes, setClasses] = useState<Class[]>([])
  const [newClassName, setNewClassName] = useState('')
  const [editingClass, setEditingClass] = useState<Class | null>(null)

  useEffect(() => {
    const savedClasses = localStorage.getItem('classes')
    if (savedClasses) {
      setClasses(JSON.parse(savedClasses))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('classes', JSON.stringify(classes))
  }, [classes])

  const addClass = () => {
    if (newClassName) {
      const newClass: Class = {
        id: generateClassId(),
        name: newClassName,
        color: colors[Math.floor(Math.random() * colors.length)]
      }
      setClasses([...classes, newClass])
      setNewClassName('')
    }
  }

  const deleteClass = (id: string) => {
    setClasses(classes.filter(c => c.id !== id))
  }

  const startEditing = (classItem: Class) => {
    setEditingClass(classItem)
    setNewClassName(classItem.name)
  }

  const saveEdit = () => {
    if (editingClass && newClassName) {
      setClasses(classes.map(c => 
        c.id === editingClass.id ? { ...c, name: newClassName } : c
      ))
      setEditingClass(null)
      setNewClassName('')
    }
  }

  const copyClassId = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success('Sınıf ID kopyalandı!')
  }

  return (
    <div>
      <div className="flex mb-4">
        <Input
          type="text"
          placeholder="Yeni sınıf adı"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          className="mr-2"
        />
        {editingClass ? (
          <Button onClick={saveEdit}>Kaydet</Button>
        ) : (
          <Button onClick={addClass}><Plus className="mr-2" /> Ekle</Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map(c => {
          const students = JSON.parse(localStorage.getItem(`students_${c.id}`) || '[]')
          const averagePoints = students.length > 0 
            ? students.reduce((sum: number, student: any) => sum + student.points, 0) / students.length 
            : 0
          
          return (
            <div key={c.id} className={`${c.color} p-4 rounded-lg shadow-lg border-2 border-gray-300`}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{c.name}</h3>
                <div>
                  <Button variant="ghost" size="icon" onClick={() => startEditing(c)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => deleteClass(c.id)}><Trash className="h-4 w-4" /></Button>
                </div>
              </div>
              <p className="text-sm mb-2 flex items-center">
                Sınıf ID: {c.id}
                <Button variant="ghost" size="icon" onClick={() => copyClassId(c.id)}><Copy className="h-4 w-4 ml-2" /></Button>
              </p>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm flex items-center"><User className="h-4 w-4 mr-1" /> {students.length} öğrenci</p>
                <p className="text-sm flex items-center"><Star className="h-4 w-4 mr-1" /> {averagePoints.toFixed(1)} ortalama puan</p>
              </div>
              <Link href={`/teacher/class/${c.id}`}>
                <Button variant="secondary" className="w-full">Sınıfa Git</Button>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

