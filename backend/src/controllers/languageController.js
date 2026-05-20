const path = require('path');
const fs = require('fs');

const getSupportedLanguages = (req, res) => {
  res.json([
    { id: 'en', name: 'English', nativeName: 'English' },
    { id: 'hi', name: 'Hindi', nativeName: 'हिन्दी' }
  ]);
};

const getTranslations = (req, res) => {
  try {
    const { code } = req.params;
    const dataPath = path.join(__dirname, '../data/translations.json');
    const rawData = fs.readFileSync(dataPath, 'utf8');
    const translationsMap = JSON.parse(rawData);

    const translations = translationsMap[code] || translationsMap['en'];
    res.json(translations);
  } catch (error) {
    console.error('Error fetching translations:', error);
    res.status(500).json({ error: 'Failed to fetch translations' });
  }
};

module.exports = {
  getSupportedLanguages,
  getTranslations
};
