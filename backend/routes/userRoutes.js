// routes/userRoutes.js
const express = require('express');
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

const userRules = [
  body('fullName', 'Full name is required').notEmpty(),
  body('email', 'Valid email is required').isEmail(),
  body('designation', 'Designation is required').notEmpty(),
];

router.route('/')
  .get(getUsers)                                                                // public
  .post(protect, upload.single('profilePhoto'), userRules, validate, createUser); // protected

router.route('/:id')
  .get(getUser)
  .put(protect, upload.single('profilePhoto'), updateUser)
  .delete(protect, deleteUser);

module.exports = router;
