const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');

// Process payment
router.post('/create', auth, async (req, res) => {
  const { amount, currency = 'usd' } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe expects amount in cents
      currency,
      metadata: { userId: req.user.userId }
    });

    const payment = new Payment({
      userId: req.user.userId,
      amount,
      stripePaymentId: paymentIntent.id,
      status: 'pending'
    });
    await payment.save();

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ message: 'Payment error' });
  }
});

// Confirm payment
router.post('/confirm', auth, async (req, res) => {
  const { paymentIntentId } = req.body;
  try {
    const payment = await Payment.findOne({ stripePaymentId: paymentIntentId, userId: req.user.userId });
    if (!payment) return res.status(404).json({ message: 'Payment not found' });

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    payment.status = paymentIntent.status === 'succeeded' ? 'completed' : 'failed';
    await payment.save();

    res.json({ status: payment.status });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;