// routes/projectRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { protect, optionalAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { getProjects, getProject, createProject, updateProject, deleteProject, duplicateProject } = require('../controllers/projectController');

const router = express.Router();

const rules = [
  body('title', 'Title is required').notEmpty(),
  body('category', 'Category is required').notEmpty(),
  body('shortDescription', 'Short description is required').notEmpty(),
  body('fullDescription', 'Full description is required').notEmpty(),
];

const projectUpload = upload.fields([
  { name: 'thumbnailImage', maxCount: 1 },
  { name: 'galleryImages', maxCount: 10 },
]);

router.route('/')
  .get(optionalAuth, getProjects)
  .post(protect, projectUpload, rules, validate, createProject);

router.route('/:id')
  .get(getProject)
  .put(protect, projectUpload, updateProject)
  .delete(protect, deleteProject);

router.post('/:id/duplicate', protect, duplicateProject);

module.exports = router;
