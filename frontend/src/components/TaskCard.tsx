import { useState } from 'react'
import { Task } from '../types/task'

interface TaskCardProps {
  task: Task
  onUpdate: (id: number, updates: Partial<Task>) => void
  onDelete: (id: number) => void
}

const priorityColors = {
  low: 'bg-green-100 text-green-800 border-green-300',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  high: 'bg-red-100 text-red-800 border-red-300',
}

const priorityLabels = {
  low: 'Baja',
  medium: 'Media',
  high: 'Alta',
}

export default function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description || '')
  const [editDueDate, setEditDueDate] = useState(
    task.dueDate ? task.dueDate.split('T')[0] : ''
  )
  const [editPriority, setEditPriority] = useState(task.priority)

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
        dueDate: editDueDate || undefined,
        priority: editPriority,
      })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditTitle(task.title)
    setEditDescription(task.description || '')
    setEditDueDate(task.dueDate ? task.dueDate.split('T')[0] : '')
    setEditPriority(task.priority)
    setIsEditing(false)
  }

  const handleStatusChange = (newStatus: 'todo' | 'in_progress' | 'done') => {
    onUpdate(task.id, { status: newStatus })
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const taskDate = new Date(date)
    taskDate.setHours(0, 0, 0, 0)
    
    const diffTime = taskDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) {
      return { text: `Vencida hace ${Math.abs(diffDays)} días`, isOverdue: true }
    } else if (diffDays === 0) {
      return { text: 'Vence hoy', isOverdue: false, isToday: true }
    } else if (diffDays === 1) {
      return { text: 'Vence mañana', isOverdue: false }
    } else {
      return {
        text: date.toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'short',
        }),
        isOverdue: false,
      }
    }
  }

  const dateInfo = formatDate(task.dueDate)

  if (isEditing) {
    return (
      <div className="rounded-lg shadow-md p-4 border-2" style={{ backgroundColor: '#FFFFFF', borderColor: '#441A85' }}>
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none text-sm transition-all"
            style={{ borderColor: '#441A85', color: '#050108' }}
            placeholder="Título"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none text-sm transition-all"
            style={{ borderColor: '#441A85', color: '#050108' }}
            placeholder="Descripción"
            rows={2}
          />
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: '#050108' }}>
              Fecha de vencimiento
            </label>
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none text-sm transition-all"
              style={{ borderColor: '#441A85', color: '#050108' }}
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: '#050108' }}>
              Prioridad
            </label>
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none text-sm transition-all"
              style={{ borderColor: '#441A85', color: '#050108', backgroundColor: '#FFFFFF' }}
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 text-white py-2 px-3 rounded-lg hover:opacity-90 transition-opacity text-xs font-medium"
              style={{ backgroundColor: '#441A85' }}
            >
              💾 Guardar
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 py-2 px-3 rounded-lg hover:opacity-80 transition-opacity text-xs font-medium"
              style={{ backgroundColor: '#050108', color: '#FFFFFF' }}
            >
              ✕ Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 border-l-4" style={{ backgroundColor: '#FFFFFF', borderLeftColor: '#441A85' }}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-sm flex-1" style={{ color: '#050108' }}>{task.title}</h3>
        <div className="flex gap-1 ml-2">
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 rounded transition-colors hover:opacity-70"
            style={{ color: '#441A85' }}
            title="Editar"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-1 rounded transition-colors hover:opacity-70"
            style={{ color: '#441A85' }}
            title="Eliminar"
          >
            🗑️
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-xs mb-3 line-clamp-2" style={{ color: '#050108', opacity: 0.7 }}>{task.description}</p>
      )}

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}
        >
          {priorityLabels[task.priority]}
        </span>
        {dateInfo && (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              dateInfo.isOverdue
                ? 'bg-red-100 text-red-800'
                : dateInfo.isToday
                ? 'bg-orange-100 text-orange-800'
                : 'text-white'
            }`}
            style={!dateInfo.isOverdue && !dateInfo.isToday ? { backgroundColor: '#441A85' } : {}}
          >
            📅 {dateInfo.text}
          </span>
        )}
      </div>

      <div className="flex gap-2 pt-2" style={{ borderTop: '1px solid #441A85' }}>
        <button
          onClick={() => handleStatusChange('todo')}
          className={`flex-1 py-1 px-2 rounded text-xs font-medium transition-opacity ${
            task.status === 'todo'
              ? 'opacity-100'
              : 'opacity-50 hover:opacity-75'
          }`}
          style={{ backgroundColor: '#441A85', color: '#FFFFFF' }}
        >
          📋
        </button>
        <button
          onClick={() => handleStatusChange('in_progress')}
          className={`flex-1 py-1 px-2 rounded text-xs font-medium transition-opacity ${
            task.status === 'in_progress'
              ? 'opacity-100'
              : 'opacity-50 hover:opacity-75'
          }`}
          style={{ backgroundColor: '#441A85', color: '#FFFFFF' }}
        >
          ⚡
        </button>
        <button
          onClick={() => handleStatusChange('done')}
          className={`flex-1 py-1 px-2 rounded text-xs font-medium transition-opacity ${
            task.status === 'done'
              ? 'opacity-100'
              : 'opacity-50 hover:opacity-75'
          }`}
          style={{ backgroundColor: '#441A85', color: '#FFFFFF' }}
        >
          ✅
        </button>
      </div>
    </div>
  )
}

