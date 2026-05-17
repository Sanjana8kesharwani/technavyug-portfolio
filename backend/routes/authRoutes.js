// routes/authRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const { register, login, getMe, logout, forgotPassword, resetPassword } = require('../controllers/authController');

const router = express.Router();

router.post('/register', [
  body('name', 'Name is required').notEmpty(),
  body('email', 'Valid email is required').isEmail(),
  body('password', 'Password must be 6+ characters').isLength({ min: 6 }),
], validate, register);

router.post('/login', [
  body('email', 'Valid email is required').isEmail(),
  body('password', 'Password is required').notEmpty(),
], validate, login);

router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.post('/forgot-password', [body('email').isEmail()], validate, forgotPassword);
router.put('/reset-password', [
  body('email').isEmail(),
  body('newPassword').isLength({ min: 6 }),
], validate, resetPassword);

module.exports = router;
