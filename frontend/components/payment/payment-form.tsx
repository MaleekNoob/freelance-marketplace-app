"use client"

import type React from "react"

import { useState } from "react"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import axios from "axios"
import { useAuth } from "@/contexts/auth-context"

// API Base URL
const API_URL = "http://localhost:5000/api"

export function PaymentForm() {
  const stripe = useStripe()
  const elements = useElements()
  const { token } = useAuth()
  const [amount, setAmount] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setIsProcessing(true)

    try {
      const { clientSecret } = await axios
        .post(
          `${API_URL}/payments/create`,
          { amount: Number.parseFloat(amount) },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        .then((res) => res.data)

      const cardElement = elements.getElement(CardElement)
      if (!cardElement) throw new Error("Card element not found")

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      })

      if (result.error) {
        setError(result.error.message || "Payment failed")
        setSuccess("")
      } else {
        await axios.post(
          `${API_URL}/payments/confirm`,
          { paymentIntentId: result.paymentIntent.id },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        setSuccess("Payment successful!")
        setError("")
        setAmount("")
        cardElement.clear()
      }
    } catch (err: any) {
      setError(err.response?.data.message || "Payment error")
      setSuccess("")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Make a Payment</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Amount (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
          required
          min="1"
        />
        <div className="p-2 border rounded">
          <CardElement
            className="py-2"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  )
}
