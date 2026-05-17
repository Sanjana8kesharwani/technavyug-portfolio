// routes/achievementRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { getAchievements, getAchievement, createAchievement, updateAchievement, deleteAchievement } = require('../controllers/achievementController');

const router = express.Router();

const rules = [
  body('title', 'Title is required').notEmpty(),
  body('type', 'Type is required').notEmpty(),
  body('description', 'Description is required').notEmpty(),
  body('issuingAuthority', 'Issuing Authority is required').notEmpty(),
];

router.route('/')
  .get(getAchievements)
  .post(protect, upload.single('badgeImage'), rules, validate, createAchievement);

router.route('/:id')
  .get(getAchievement)
  .put(protect, upload.single('badgeImage'), updateAchievement)
  .delete(protect, deleteAchievement);

module.exports = router;
