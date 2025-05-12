"use client"

import { createContext, useState, useEffect, useContext, type ReactNode } from "react"
import axios from "axios"

// API Base URL
const API_URL = "http://localhost:5000/api"

type User = {
  _id: string
  name: string
  email: string
  role: "freelancer" | "client"
}

type AuthContextType = {
  user: User | null
  token: string
  login: (token: string) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get token from localStorage on initial load
    const storedToken = localStorage.getItem("token") || ""
    setToken(storedToken)
  }, [])

  useEffect(() => {
    if (token) {
      setIsLoading(true)
      axios
        .get(`${API_URL}/profile`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          setUser(res.data)
          setIsLoading(false)
        })
        .catch(() => {
          setToken("")
          localStorage.removeItem("token")
          setIsLoading(false)
        })
    } else {
      setUser(null)
      setIsLoading(false)
    }
  }, [token])

  const login = (newToken: string) => {
    setToken(newToken)
    localStorage.setItem("token", newToken)
  }

  const logout = () => {
    setToken("")
    setUser(null)
    localStorage.removeItem("token")
  }

  return <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
