// models/AuditLog.js
const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  adminId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  action:     { type: String, required: true },   // CREATE, UPDATE, DELETE, DUPLICATE
  resource:   { type: String, required: true },   // User, Project, Certificate, Achievement
  resourceId: { type: mongoose.Schema.Types.ObjectId },
  details:    { type: Object, default: {} },
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);
