const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  duration: { type: String, required: true }, // e.g., "120 mins"
  rating: { type: String, required: true }, // e.g., "PG-13", "R"
  posterUrl: { type: String, required: true },
  bannerUrl: { type: String, required: true },
  language: { type: String, required: true },
  genre: { type: String, required: true }
}, {
  timestamps: true
});
movieSchema.index({ title: 1 });

module.exports = mongoose.model('Movie', movieSchema);
