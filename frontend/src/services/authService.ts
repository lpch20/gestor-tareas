import axios from 'axios'
import { LoginDto, RegisterDto, AuthResponse } from '../types/auth'

const API_URL = 'http://localhost:3000'

const authApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const authService = {
  async login(credentials: LoginDto): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>('/auth/login', credentials)
    return response.data
  },

  async register(data: RegisterDto): Promise<AuthResponse> {
    const response = await authApi.post<AuthResponse>('/auth/register', data)
    return response.data
  },
}

export const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('token', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
  }
}


export const getAuthToken = (): string | null => {
  return localStorage.getItem('token')
}


const token = getAuthToken()
if (token) {
  setAuthToken(token)
}

