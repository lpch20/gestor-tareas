import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '../types/auth'
import { authService, setAuthToken, getAuthToken } from '../services/authService'
import { LoginDto, RegisterDto } from '../types/auth'
import { jwtDecode } from 'jwt-decode'

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (credentials: LoginDto) => Promise<void>
  register: (data: RegisterDto) => Promise<void>
  logout: () => void
  clearError: () => void
  isAuthenticated: boolean
}

interface JwtPayload {
  userId: number
  username: string
  exp?: number
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getAuthToken()
      if (token) {
        try {
          const decoded = jwtDecode<JwtPayload>(token)
          
          if (decoded.exp && decoded.exp * 1000 < Date.now()) {
            setAuthToken(null)
            setUser(null)
          } else {
            setAuthToken(token)
            setUser({
              id: decoded.userId,
              username: decoded.username,
            })
          }
        } catch (error) {
          console.error('Error decodificando token:', error)
          setAuthToken(null)
          setUser(null)
        }
      }
      setLoading(false)
    }
    
    initializeAuth()
  }, [])

  const login = async (credentials: LoginDto) => {
    try {
      setLoading(true)
      setError(null)
      const response = await authService.login(credentials)
      console.log(response)
      setAuthToken(response.token)
      setUser(response.user)
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al iniciar sesión'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (data: RegisterDto) => {
    try {
      setLoading(true)
      setError(null)
      const response = await authService.register(data)
      setAuthToken(response.token)
      setUser(response.user)
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al registrar usuario'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setAuthToken(null)
    setUser(null)
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        clearError,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider')
  }
  return context
}

