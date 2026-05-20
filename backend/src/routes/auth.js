const express = require('express');
const router = express.Router();
const { signup, login, logout, changePassword, refresh, getProfile, verifyOtp, resendOtp } = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../middleware/validators');
const auth = require('../middleware/auth');

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/refresh', refresh);

router.post('/logout', auth, logout); // Logout strictly wrapped by bearer auth
router.post('/change-password', auth, changePassword);
router.get('/me', auth, getProfile);

module.exports = router;
