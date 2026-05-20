const express = require('express');
const router = express.Router();
const { getSupportedLanguages, getTranslations } = require('../controllers/languageController');

router.get('/', getSupportedLanguages);
router.get('/:code/translations', getTranslations);

module.exports = router;
