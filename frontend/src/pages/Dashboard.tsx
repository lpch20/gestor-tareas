import { useNavigate } from 'react-router-dom'
import KanbanBoard from '../components/KanbanBoard'
import TaskForm from '../components/TaskForm'
import { useTasks } from '../contexts/TaskContext'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { user, logout } = useAuth()
  const { tasks, loading, error, createTask, updateTask, deleteTask, clearError } = useTasks()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  

  const totalTasks = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'done').length
  const inProgressTasks = tasks.filter(t => t.status === 'in_progress').length

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ backgroundColor: '#441A85' }}>
                {user?.username.charAt(0).toUpperCase()}
              </div>
              <span className="font-medium" style={{ color: '#050108' }}>Hola, {user?.username}!</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg hover:opacity-80 transition-opacity font-medium text-sm text-white"
              style={{ backgroundColor: '#441A85' }}
            >
              🚪 Cerrar Sesión
            </button>
          </div>
          <h1 className="text-5xl font-bold mb-2" style={{ color: '#441A85' }}>
            📋 Tablero de Tareas
          </h1>
          {totalTasks > 0 && (
            <div className="flex justify-center gap-4 mt-4">
              <span className="px-4 py-2 rounded-full shadow-sm text-sm" style={{ backgroundColor: '#FFFFFF', color: '#050108', border: '1px solid #441A85' }}>
                📊 Total: {totalTasks}
              </span>
              <span className="px-4 py-2 rounded-full shadow-sm text-sm text-white" style={{ backgroundColor: '#441A85' }}>
                ⚡ En Progreso: {inProgressTasks}
              </span>
              <span className="px-4 py-2 rounded-full shadow-sm text-sm text-white" style={{ backgroundColor: '#441A85' }}>
                ✅ Completadas: {completedTasks}
              </span>
            </div>
          )}
        </header>

        {error && (
          <div className="mb-6 p-4 border-l-4 rounded-lg shadow-md flex items-center justify-between" style={{ backgroundColor: '#FFFFFF', borderLeftColor: '#441A85' }}>
            <span style={{ color: '#050108' }}>{error}</span>
            <button
              onClick={clearError}
              className="font-bold text-lg hover:opacity-70"
              style={{ color: '#441A85' }}
            >
              ✕
            </button>
          </div>
        )}

        <div className="mb-6 flex justify-end">
          <TaskForm onSubmit={createTask} />
        </div>

        <div className="rounded-xl shadow-xl p-6 border" style={{ backgroundColor: '#FFFFFF', borderColor: '#441A85' }}>
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-transparent" style={{ borderColor: '#441A85' }}></div>
              <p className="mt-4 text-lg" style={{ color: '#050108' }}>Cargando tareas...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-xl mb-2" style={{ color: '#050108' }}>No hay tareas aún</p>
              <p style={{ color: '#050108', opacity: 0.7 }}>¡Crea tu primera tarea para comenzar!</p>
            </div>
          ) : (
            <KanbanBoard
              tasks={tasks}
              onUpdate={updateTask}
              onDelete={deleteTask}
            />
          )}
        </div>
      </div>
    </div>
  )
}

