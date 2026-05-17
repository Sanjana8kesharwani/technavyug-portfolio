// models/Certificate.js
const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certificateTitle:      { type: String, required: true },
  issuingOrganization:   { type: String, required: true },
  issueDate:             { type: Date, required: true },
  certificateId:         { type: String, required: true, unique: true },
  verificationUrl:       { type: String, default: '' },
  certificateFile:       { type: String, default: '' },
  category:              { type: String, default: '' },
  userId:                { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  qrCode:                { type: String, default: '' },
  verified:              { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
