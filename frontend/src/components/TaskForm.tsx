import { useState, useEffect, useCallback } from 'react'
import { CreateTaskDto } from '../types/task'

interface TaskFormProps {
  onSubmit: (data: CreateTaskDto) => void
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setTitle('')
    setDescription('')
    setDueDate('')
    setPriority('medium')
  }, [])

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
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose()
        }
      }
      document.addEventListener('keydown', handleEscape)
      return () => {
        document.body.style.overflow = 'unset'
        document.removeEventListener('keydown', handleEscape)
      }
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleClose])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full md:w-auto text-white py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all font-medium shadow-md hover:shadow-lg hover:opacity-90 flex items-center justify-center gap-2"
        style={{ backgroundColor: '#441A85' }}
      >
        ➕ Agregar Nueva Tarea
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl border"
            style={{ 
              backgroundColor: '#FFFFFF',
              borderColor: '#441A85'
            }}
            onClick={(e) => e.stopPropagation()}
          >

            <div className="sticky top-0 flex items-center justify-between p-6 border-b" style={{ borderColor: '#441A85', backgroundColor: '#FFFFFF' }}>
              <h2 className="text-2xl font-semibold" style={{ color: '#441A85' }}>➕ Nueva Tarea</h2>
              <button
                onClick={handleClose}
                className="text-2xl font-bold hover:opacity-70 transition-opacity"
                style={{ color: '#441A85' }}
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </div>

            {/* Contenido del formulario */}
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all font-medium border"
                    style={{ 
                      borderColor: '#441A85',
                      color: '#441A85',
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all font-medium shadow-md hover:shadow-lg hover:opacity-90"
                    style={{ backgroundColor: '#441A85' }}
                  >
                    ➕ Crear Tarea
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

