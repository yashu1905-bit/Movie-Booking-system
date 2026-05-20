const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');
const protect = require('../middleware/auth');

router.get('/', settingController.getSettings);
router.put('/', protect, settingController.updateSettings);

module.exports = router;
