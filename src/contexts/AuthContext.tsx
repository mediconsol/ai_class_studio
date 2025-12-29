import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { authApi, tokenStorage, type User } from '@/lib/api'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // 초기 로드 시 토큰으로 사용자 정보 복원
  useEffect(() => {
    const initAuth = async () => {
      const token = tokenStorage.get()

      if (token) {
        try {
          const { user } = await authApi.me()
          setUser(user)
        } catch (error) {
          console.error('Failed to restore session:', error)
          tokenStorage.remove()
        }
      }

      setIsLoading(false)
    }

    initAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const { token, user } = await authApi.login(email, password)
      tokenStorage.set(token)
      setUser(user)
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = () => {
    tokenStorage.remove()
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
