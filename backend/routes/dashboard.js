const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Payment = require('../models/Payment');

// Get dashboard data
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('name role');
    const payments = await Payment.find({ userId: req.user.userId });

    const totalEarnings = payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0);

    res.json({
      user,
      totalEarnings,
      projectCount: payments.length,
      recentPayments: payments.slice(0, 5)
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;