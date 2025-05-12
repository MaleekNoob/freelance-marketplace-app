"use client"

import type React from "react"

import { useState, useEffect } from "react"
import axios from "axios"
import { useAuth } from "@/contexts/auth-context"

// API Base URL
const API_URL = "http://localhost:5000/api"

export function Profile() {
  const { user, token } = useAuth()
  const [formData, setFormData] = useState({ name: "", email: "" })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await axios.put(`${API_URL}/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setSuccess("Profile updated successfully")
      setError("")
    } catch (err: any) {
      setError(err.response?.data.message || "Error updating profile")
      setSuccess("")
    }
  }

  if (!user) return <div className="container mx-auto p-4">Loading...</div>

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Update Profile
        </button>
      </form>
    </div>
  )
}
