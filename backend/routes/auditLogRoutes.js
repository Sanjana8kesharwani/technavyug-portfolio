// routes/auditLogRoutes.js
const express = require('express');
const { protect } = require('../middleware/auth');
const { getAuditLogs } = require('../controllers/auditLogController');

const router = express.Router();
router.get('/', protect, getAuditLogs);

module.exports = router;
