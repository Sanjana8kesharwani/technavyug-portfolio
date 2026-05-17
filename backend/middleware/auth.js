// middleware/auth.js — JWT authentication & role authorisation
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const Admin = require('../models/Admin');

// Protect routes — verifies Bearer token
const protect = asyncHandler(async (req, _res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) throw new ApiError(401, 'Not authorised — no token');

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const admin = await Admin.findById(decoded.id).select('-password');
  if (!admin) throw new ApiError(401, 'Not authorised — admin not found');

  req.admin = admin;
  next();
});

// Optional auth — attaches admin if token present, otherwise continues
const optionalAuth = asyncHandler(async (req, _res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.admin = await Admin.findById(decoded.id).select('-password');
    } catch (_e) { /* ignore invalid token on public routes */ }
  }
  next();
});

// Restrict to specific roles
const authorize = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.admin.role)) {
    throw new ApiError(403, `Role "${req.admin.role}" is not authorised`);
  }
  next();
};

module.exports = { protect, optionalAuth, authorize };
