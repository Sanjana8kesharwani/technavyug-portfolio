// models/Achievement.js
const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title:            { type: String, required: true },
  type:             { type: String, required: true },
  description:      { type: String, required: true },
  issuingAuthority: { type: String, required: true },
  badgeImage:       { type: String, default: '' },
  featured:         { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
