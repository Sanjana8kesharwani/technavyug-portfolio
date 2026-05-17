// controllers/dashboardController.js — Aggregated analytics for the admin dashboard
const User = require('../models/User');
const Project = require('../models/Project');
const Certificate = require('../models/Certificate');
const Achievement = require('../models/Achievement');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');

// GET /api/dashboard  (protected)
exports.getDashboardStats = asyncHandler(async (_req, res) => {
  // Card counts
  const [totalUsers, totalProjects, totalCertificates, totalAchievements, featuredProjects, publicProjects] = await Promise.all([
    User.countDocuments(),
    Project.countDocuments(),
    Certificate.countDocuments(),
    Achievement.countDocuments(),
    Project.countDocuments({ featured: true }),
    Project.countDocuments({ visibility: 'Public' }),
  ]);

  // Achievements grouped by type / domain
  const achievementsByDomain = await Achievement.aggregate([
    { $group: { _id: '$type', count: { $sum: 1 } } },
  ]);

  // Certificates per month (current year)
  const certificatesPerMonth = await Certificate.aggregate([
    { $group: { _id: { $month: '$issueDate' }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  // User growth per month
  const userGrowth = await User.aggregate([
    { $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  res.json(new ApiResponse(200, {
    cards: { totalUsers, totalProjects, totalCertificates, totalAchievements, featuredProjects, publicProjects },
    charts: { achievementsByDomain, certificatesPerMonth, userGrowth },
  }, 'Dashboard stats fetched'));
});
