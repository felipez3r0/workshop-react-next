"use client"
import { createContext, useContext, ReactNode, useState } from 'react'

interface IAuthContext {
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {}
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = () => {
    setIsAuthenticated(true)
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)