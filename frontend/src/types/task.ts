export interface Task {
  id: number
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'done'
  dueDate?: string
  priority: 'low' | 'medium' | 'high'
  createdAt: string
  updatedAt: string
}

export interface CreateTaskDto {
  title: string
  description?: string
  status?: 'todo' | 'in_progress' | 'done'
  dueDate?: string
  priority?: 'low' | 'medium' | 'high'
}

export interface UpdateTaskDto {
  title?: string
  description?: string
  status?: 'todo' | 'in_progress' | 'done'
  dueDate?: string
  priority?: 'low' | 'medium' | 'high'
}

