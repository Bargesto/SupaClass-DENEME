import { TeacherLayout } from '@/components/TeacherLayout'
import { ClassList } from '@/components/ClassList'

export default function ClassesPage() {
  return (
    <TeacherLayout>
      <h1 className="text-3xl font-bold mb-6">Sınıflarım</h1>
      <ClassList />
    </TeacherLayout>
  )
}

