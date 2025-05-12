"use client"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { PaymentForm } from "./payment-form"

// Replace with your actual publishable key
const stripePromise = loadStripe("pk_test_your_stripe_publishable_key")

export function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  )
}
