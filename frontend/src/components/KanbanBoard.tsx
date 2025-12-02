import { Task } from '../types/task'
import TaskCard from './TaskCard'

interface KanbanBoardProps {
  tasks: Task[]
  onUpdate: (id: number, updates: Partial<Task>) => void
  onDelete: (id: number) => void
}

const columns = [
  { id: 'todo', title: '📋 Por Hacer', color: '#FFFFFF' },
  { id: 'in_progress', title: '⚡ En Progreso', color: '#FFFFFF' },
  { id: 'done', title: '✅ Completadas', color: '#FFFFFF' },
]

export default function KanbanBoard({ tasks, onUpdate, onDelete }: KanbanBoardProps) {
  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map((column) => {
        const columnTasks = getTasksByStatus(column.id)
        return (
          <div key={column.id} className="flex flex-col">
            <div className="rounded-t-lg px-4 py-3 mb-2 border" style={{ backgroundColor: column.color, borderColor: '#441A85' }}>
              <h3 className="font-semibold" style={{ color: '#441A85' }}>
                {column.title}
              </h3>
              <span className="text-sm" style={{ color: '#050108', opacity: 0.7 }}>
                {columnTasks.length} {columnTasks.length === 1 ? 'tarea' : 'tareas'}
              </span>
            </div>
            <div className="flex-1 rounded-b-lg p-3 min-h-[400px] space-y-3 border border-t-0" style={{ backgroundColor: '#FFFFFF', borderColor: '#441A85' }}>
              {columnTasks.length === 0 ? (
                <div className="text-center py-8 text-sm" style={{ color: '#050108', opacity: 0.5 }}>
                  No hay tareas
                </div>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                  />
                ))
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

