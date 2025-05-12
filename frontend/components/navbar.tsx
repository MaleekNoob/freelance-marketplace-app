"use client"

import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-xl font-bold">
          Freelance Marketplace
        </Link>
        <div className="space-x-4">
          {user ? (
            <>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link href="/profile" className="hover:underline">
                Profile
              </Link>
              <Link href="/payment" className="hover:underline">
                Payment
              </Link>
              <button onClick={logout} className="hover:underline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="hover:underline">
                Sign In
              </Link>
              <Link href="/signup" className="hover:underline">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
