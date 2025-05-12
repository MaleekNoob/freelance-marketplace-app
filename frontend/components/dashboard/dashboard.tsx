"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "@/contexts/auth-context"

// API Base URL
const API_URL = "http://localhost:5000/api"

type Payment = {
  _id: string
  amount: number
  status: string
  createdAt: string
}

type DashboardData = {
  user: {
    name: string
    role: string
  }
  totalEarnings: number
  projectCount: number
  recentPayments: Payment[]
}

export function Dashboard() {
  const { user, token } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (token) {
      setIsLoading(true)
      axios
        .get(`${API_URL}/dashboard`, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          setDashboardData(res.data)
          setError("")
        })
        .catch((err) => {
          console.error("Error fetching dashboard:", err)
          setError("Failed to load dashboard data")
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [token])

  if (isLoading) return <div className="container mx-auto p-4">Loading...</div>
  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>
  if (!user || !dashboardData) return <div className="container mx-auto p-4">No data available</div>

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold">User Info</h3>
          <p>Name: {dashboardData.user.name}</p>
          <p>Role: {dashboardData.user.role}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h3 className="text-lg font-semibold">Stats</h3>
          <p>Total Earnings: ${dashboardData.totalEarnings.toFixed(2)}</p>
          <p>Projects: {dashboardData.projectCount}</p>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Recent Payments</h3>
        {dashboardData.recentPayments.length === 0 ? (
          <p className="mt-2">No recent payments</p>
        ) : (
          <ul className="mt-2 space-y-2">
            {dashboardData.recentPayments.map((payment) => (
              <li key={payment._id} className="bg-white p-2 shadow rounded">
                Amount: ${payment.amount.toFixed(2)} | Status: {payment.status} | Date:{" "}
                {new Date(payment.createdAt).toLocaleDateString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
