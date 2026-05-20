const Setting = require('../models/Setting');
const { successResponse } = require('../utils/responseFormatter');
const AppError = require('../errors/AppError');

// Get the single global settings document (creates one if it doesn't exist)
exports.getSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }
    return successResponse(res, settings, 'System settings retrieved successfully', 200);
  } catch (error) {
    next(error);
  }
};

// Update the global settings document
exports.updateSettings = async (req, res, next) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting(req.body);
      await settings.save();
    } else {
      settings = await Setting.findByIdAndUpdate(settings._id, req.body, { returnDocument: 'after', runValidators: true });
    }
    
    // Sync platformName with .env APP_NAME
    if (req.body.platformName) {
      const fs = require('fs');
      const path = require('path');
      const envPath = path.join(__dirname, '../../.env');
      if (fs.existsSync(envPath)) {
        let envContent = fs.readFileSync(envPath, 'utf8');
        if (envContent.includes('APP_NAME=')) {
          envContent = envContent.replace(/APP_NAME=.*/g, `APP_NAME="${req.body.platformName}"`);
        } else {
          envContent += `\nAPP_NAME="${req.body.platformName}"`;
        }
        fs.writeFileSync(envPath, envContent);
      }
    }

    return successResponse(res, settings, 'System settings updated securely naturally smoothly natively comfortably', 200);
  } catch (error) {
    next(error);
  }
};
