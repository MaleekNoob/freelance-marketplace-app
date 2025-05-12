"use client"

import { Payment } from "@/components/payment/payment"
import { ProtectedRoute } from "@/components/protected-route"

export default function PaymentPage() {
  return (
    <ProtectedRoute>
      <Payment />
    </ProtectedRoute>
  )
}
