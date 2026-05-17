// utils/auditLogger.js — Helper to create audit log entries
const AuditLog = require('../models/AuditLog');

const logAction = async (adminId, action, resource, resourceId = null, details = {}) => {
  try {
    await AuditLog.create({ adminId, action, resource, resourceId, details });
  } catch (err) {
    console.error('Audit log write failed:', err.message);
  }
};

module.exports = { logAction };
