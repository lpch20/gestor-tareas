export interface User {
  id: number
  username: string
}

export interface LoginDto {
  username: string
  password: string
}

export interface RegisterDto {
  username: string
  password: string
}

export interface AuthResponse {
  message: string
  user: User
  token: string
}

