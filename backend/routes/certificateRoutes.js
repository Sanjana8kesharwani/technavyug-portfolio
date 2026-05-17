// routes/certificateRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { getCertificates, getCertificate, createCertificate, updateCertificate, deleteCertificate, verifyCertificate } = require('../controllers/certificateController');

const router = express.Router();

const rules = [
  body('certificateTitle', 'Title is required').notEmpty(),
  body('issuingOrganization', 'Organization is required').notEmpty(),
  body('issueDate', 'Issue date is required').notEmpty(),
];

// PUBLIC verification endpoint (must come BEFORE /:id to avoid conflict)
router.get('/verify/:certificateId', verifyCertificate);

router.route('/')
  .get(protect, getCertificates)
  .post(protect, upload.single('certificateFile'), rules, validate, createCertificate);

router.route('/:id')
  .get(protect, getCertificate)
  .put(protect, upload.single('certificateFile'), updateCertificate)
  .delete(protect, deleteCertificate);

module.exports = router;
