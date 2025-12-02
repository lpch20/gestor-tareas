import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Task, CreateTaskDto } from '../types/task'
import { taskService } from '../services/taskService'
import { useAuth } from './AuthContext'

interface TaskContextType {
  tasks: Task[]
  loading: boolean
  error: string | null
  createTask: (data: CreateTaskDto) => Promise<void>
  updateTask: (id: number, updates: Partial<Task>) => Promise<void>
  deleteTask: (id: number) => Promise<void>
  refreshTasks: () => Promise<void>
  clearError: () => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated, loading: authLoading } = useAuth()

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await taskService.getAll()
      setTasks(data)
    } catch (err) {
      setError('Error al cargar las tareas')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      loadTasks()
    } else if (!authLoading && !isAuthenticated) {
      setTasks([])
      setLoading(false)
    }
  }, [isAuthenticated, authLoading])

  const createTask = async (data: CreateTaskDto) => {
    try {
      setError(null)
      const newTask = await taskService.create(data)
      setTasks((prevTasks) => [...prevTasks, newTask])
    } catch (err) {
      setError('Error al crear la tarea')
      console.error(err)
      throw err
    }
  }

  const updateTask = async (id: number, updates: Partial<Task>) => {
    try {
      setError(null)
      const updatedTask = await taskService.update(id, updates)
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      )
    } catch (err) {
      setError('Error al actualizar la tarea')
      console.error(err)
      throw err
    }
  }

  const deleteTask = async (id: number) => {
    try {
      setError(null)
      await taskService.delete(id)
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
    } catch (err) {
      setError('Error al eliminar la tarea')
      console.error(err)
      throw err
    }
  }

  const refreshTasks = async () => {
    await loadTasks()
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        createTask,
        updateTask,
        deleteTask,
        refreshTasks,
        clearError,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTasks debe ser usado dentro de un TaskProvider')
  }
  return context
}

