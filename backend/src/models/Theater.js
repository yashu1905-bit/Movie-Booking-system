const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Theater', theaterSchema);
