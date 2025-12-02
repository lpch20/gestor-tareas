import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, register, error, clearError } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim() || !password.trim()) {
      return
    }

    try {
      setLoading(true)
      clearError()
      if (isLogin) {
        await login({ username: username.trim(), password })
      } else {
        await register({ username: username.trim(), password })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="rounded-xl shadow-2xl p-8 w-full max-w-md" style={{ backgroundColor: '#FFFFFF', border: '2px solid #441A85' }}>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#441A85' }}>
            📋 Tablero de Tareas
          </h1>
          <p style={{ color: '#050108' }}>
            {isLogin ? 'Inicia sesión para continuar' : 'Crea una cuenta nueva'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 border-l-4 rounded-lg" style={{ backgroundColor: '#FFFFFF', borderLeftColor: '#441A85' }}>
            <div className="flex items-center justify-between">
              <span style={{ color: '#050108' }}>{error}</span>
              <button
                onClick={clearError}
                className="font-bold hover:opacity-70"
                style={{ color: '#441A85' }}
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1" style={{ color: '#050108' }}>
              Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
              style={{ 
                borderColor: '#441A85',
                focusRingColor: '#441A85',
                color: '#050108'
              }}
              placeholder="Ingresa tu usuario"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1" style={{ color: '#050108' }}>
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none transition-all"
              style={{ 
                borderColor: '#441A85',
                focusRingColor: '#441A85',
                color: '#050108'
              }}
              placeholder="Ingresa tu contraseña"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: '#441A85',
              focusRingColor: '#441A85'
            }}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {isLogin ? 'Iniciando sesión...' : 'Registrando...'}
              </span>
            ) : (
              isLogin ? '🔐 Iniciar Sesión' : '✨ Crear Cuenta'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setUsername('')
              setPassword('')
              clearError()
            }}
            className="text-sm font-medium hover:opacity-80 transition-opacity"
            style={{ color: '#441A85' }}
            disabled={loading}
          >
            {isLogin ? (
              <>¿No tienes cuenta? <span className="font-bold">Regístrate</span></>
            ) : (
              <>¿Ya tienes cuenta? <span className="font-bold">Inicia sesión</span></>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

