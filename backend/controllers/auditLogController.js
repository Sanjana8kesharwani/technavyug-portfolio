// controllers/auditLogController.js
const AuditLog = require('../models/AuditLog');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');

// GET /api/audit-logs  (protected)
exports.getAuditLogs = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.search) {
    const re = { $regex: req.query.search, $options: 'i' };
    filter.$or = [{ action: re }, { resource: re }];
  }

  const logs = await AuditLog.find(filter).populate('adminId', 'name email').sort('-createdAt').limit(100);
  res.json(new ApiResponse(200, logs, 'Audit logs fetched'));
});
