const express = require('express');
const router = express.Router();
const discountController = require('../controllers/discountController');
const protect = require('../middleware/auth');

router.post('/validate', protect, discountController.validateCode);

module.exports = router;
