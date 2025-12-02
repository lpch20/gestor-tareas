import { useState } from 'react'
import { CreateTaskDto } from '../types/task'

interface TaskFormProps {
  onSubmit: (data: CreateTaskDto) => void
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        dueDate: dueDate || undefined,
        priority,
        status: 'todo',
      })
      setTitle('')
      setDescription('')
      setDueDate('')
      setPriority('medium')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4" style={{ color: '#441A85' }}>➕ Nueva Tarea</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium mb-1" style={{ color: '#050108' }}>
            Título *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
            style={{ 
              borderColor: '#441A85',
              color: '#050108'
            }}
            placeholder="Ej: Comprar leche"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium mb-1" style={{ color: '#050108' }}>
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
            style={{ 
              borderColor: '#441A85',
              color: '#050108'
            }}
            placeholder="Descripción opcional de la tarea"
            rows={3}
          />
        </div>
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium mb-1" style={{ color: '#050108' }}>
            📅 Fecha de Vencimiento
          </label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
            style={{ 
              borderColor: '#441A85',
              color: '#050108'
            }}
          />
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium mb-1" style={{ color: '#050108' }}>
            ⚡ Prioridad
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
            style={{ 
              borderColor: '#441A85',
              color: '#050108',
              backgroundColor: '#FFFFFF'
            }}
          >
            <option value="low">🟢 Baja</option>
            <option value="medium">🟡 Media</option>
            <option value="high">🔴 Alta</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="w-full text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all font-medium shadow-md hover:shadow-lg hover:opacity-90"
        style={{ backgroundColor: '#441A85' }}
      >
        ➕ Crear Tarea
      </button>
    </form>
  )
}

