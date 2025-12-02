import axios from 'axios'
import { Task, CreateTaskDto, UpdateTaskDto } from '../types/task'
import { getAuthToken } from './authService'

const API_URL = 'http://localhost:3000/tasks'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = getAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export const taskService = {
  async getAll(): Promise<Task[]> {
    const response = await api.get<Task[]>('/')
    return response.data
  },

  async getById(id: number): Promise<Task> {
    const response = await api.get<Task>(`/${id}`)
    return response.data
  },

  async create(data: CreateTaskDto): Promise<Task> {
    const response = await api.post<Task>('/', data)
    return response.data
  },

  async update(id: number, data: UpdateTaskDto): Promise<Task> {
    const response = await api.patch<Task>(`/${id}`, data)
    return response.data
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/${id}`)
  },
}

