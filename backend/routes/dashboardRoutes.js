// routes/dashboardRoutes.js
const express = require('express');
const { protect } = require('../middleware/auth');
const { getDashboardStats } = require('../controllers/dashboardController');

const router = express.Router();
router.get('/', protect, getDashboardStats);

module.exports = router;
