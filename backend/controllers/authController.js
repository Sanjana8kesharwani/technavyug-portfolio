// controllers/authController.js
const crypto = require('crypto');
const Admin = require('../models/Admin');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');
const { logAction } = require('../utils/auditLogger');

// Helper — send token + admin data
const sendTokenResponse = (admin, statusCode, res) => {
  const token = admin.getSignedJwtToken();
  res.status(statusCode).json({
    success: true,
    token,
    data: { _id: admin._id, name: admin.name, email: admin.email, role: admin.role },
  });
};

// POST /api/auth/register
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  if (await Admin.findOne({ email })) throw new ApiError(400, 'Admin with this email already exists');

  const admin = await Admin.create({ name, email, password, role });
  await logAction(admin._id, 'REGISTER', 'Admin', admin._id, { email });
  sendTokenResponse(admin, 201, res);
});

// POST /api/auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, 'Email and password are required');

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin) throw new ApiError(401, 'Invalid credentials');

  const isMatch = await admin.matchPassword(password);
  if (!isMatch) throw new ApiError(401, 'Invalid credentials');

  await logAction(admin._id, 'LOGIN', 'Admin', admin._id, { email });
  sendTokenResponse(admin, 200, res);
});

// GET /api/auth/me
exports.getMe = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.admin, 'Admin fetched'));
});

// POST /api/auth/logout
exports.logout = asyncHandler(async (_req, res) => {
  res.status(200).json(new ApiResponse(200, {}, 'Logged out'));
});

// POST /api/auth/forgot-password  (simplified — logs intent, returns success)
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) throw new ApiError(404, 'No account with that email');

  // In production you'd generate a reset token and email it.
  // For now we create a simple token and return it directly for dev convenience.
  const resetToken = crypto.randomBytes(20).toString('hex');
  await logAction(admin._id, 'FORGOT_PASSWORD', 'Admin', admin._id, { email });
  res.status(200).json(new ApiResponse(200, { resetToken }, 'Password reset token generated'));
});

// PUT /api/auth/reset-password
exports.resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) throw new ApiError(400, 'Email and new password are required');

  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin) throw new ApiError(404, 'Admin not found');

  admin.password = newPassword;
  await admin.save();

  await logAction(admin._id, 'RESET_PASSWORD', 'Admin', admin._id, { email });
  sendTokenResponse(admin, 200, res);
});
