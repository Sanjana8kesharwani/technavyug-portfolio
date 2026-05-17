// middleware/upload.js — Multer + Cloudinary file upload
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const ApiError = require('../utils/apiError');

// Cloudinary storage — automatically uploads to cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req, file) => {
    let folder = 'devfolio';
    if (file.fieldname === 'profilePhoto')   folder += '/users';
    if (file.fieldname === 'badgeImage')     folder += '/achievements';
    if (file.fieldname === 'thumbnailImage') folder += '/projects';
    if (file.fieldname === 'galleryImages')  folder += '/projects/gallery';
    if (file.fieldname === 'certificateFile') folder += '/certificates';

    // PDFs need raw resource_type
    if (file.mimetype === 'application/pdf') {
      return { folder, format: 'pdf', resource_type: 'raw' };
    }
    return { folder };
  },
});

// File filter — only images and PDFs
const fileFilter = (_req, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Only images (JPG/PNG) and PDF files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

module.exports = upload;
