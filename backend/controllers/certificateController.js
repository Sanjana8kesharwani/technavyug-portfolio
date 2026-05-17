// controllers/certificateController.js
const crypto = require('crypto');
const QRCode = require('qrcode');
const Certificate = require('../models/Certificate');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');
const { logAction } = require('../utils/auditLogger');

// GET /api/certificates  (protected)
exports.getCertificates = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.search) {
    const re = { $regex: req.query.search, $options: 'i' };
    filter.$or = [{ certificateTitle: re }, { certificateId: re }];
  }
  if (req.query.category) filter.category = req.query.category;

  const certs = await Certificate.find(filter).populate('userId', 'fullName email').sort('-issueDate');
  res.json(new ApiResponse(200, certs, 'Certificates fetched'));
});

// GET /api/certificates/:id  (protected)
exports.getCertificate = asyncHandler(async (req, res) => {
  const cert = await Certificate.findById(req.params.id).populate('userId', 'fullName email');
  if (!cert) throw new ApiError(404, 'Certificate not found');
  res.json(new ApiResponse(200, cert, 'Certificate fetched'));
});

// POST /api/certificates  (protected)
exports.createCertificate = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.certificateFile = req.file.path;

  // Auto-generate unique certificate ID if not provided
  if (!data.certificateId) {
    data.certificateId = `CERT-${Date.now()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
  }

  // Build verification URL & QR code
  data.verificationUrl = `${process.env.FRONTEND_URL}/verify?id=${data.certificateId}`;
  try { data.qrCode = await QRCode.toDataURL(data.verificationUrl); } catch (_e) { /* ignore */ }

  const cert = await Certificate.create(data);
  await logAction(req.admin._id, 'CREATE', 'Certificate', cert._id, { certificateId: cert.certificateId });
  res.status(201).json(new ApiResponse(201, cert, 'Certificate created'));
});

// PUT /api/certificates/:id  (protected)
exports.updateCertificate = asyncHandler(async (req, res) => {
  let cert = await Certificate.findById(req.params.id);
  if (!cert) throw new ApiError(404, 'Certificate not found');

  const data = { ...req.body };
  if (req.file) data.certificateFile = req.file.path;

  cert = await Certificate.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  await logAction(req.admin._id, 'UPDATE', 'Certificate', cert._id, { certificateId: cert.certificateId });
  res.json(new ApiResponse(200, cert, 'Certificate updated'));
});

// DELETE /api/certificates/:id  (protected)
exports.deleteCertificate = asyncHandler(async (req, res) => {
  const cert = await Certificate.findById(req.params.id);
  if (!cert) throw new ApiError(404, 'Certificate not found');
  await cert.deleteOne();
  await logAction(req.admin._id, 'DELETE', 'Certificate', cert._id, { certificateId: cert.certificateId });
  res.json(new ApiResponse(200, {}, 'Certificate deleted'));
});

// GET /api/certificates/verify/:certificateId  (PUBLIC)
exports.verifyCertificate = asyncHandler(async (req, res) => {
  const cert = await Certificate.findOne({ certificateId: req.params.certificateId })
    .populate('userId', 'fullName email designation profilePhoto');

  if (!cert) {
    return res.status(404).json(new ApiResponse(404, { valid: false }, 'Certificate is Invalid'));
  }

  res.json(new ApiResponse(200, {
    valid: true,
    certificate: {
      title: cert.certificateTitle,
      issueDate: cert.issueDate,
      organization: cert.issuingOrganization,
      preview: cert.certificateFile,
      certificateId: cert.certificateId,
      category: cert.category,
      user: cert.userId,
    },
  }, 'Certificate is Valid'));
});
