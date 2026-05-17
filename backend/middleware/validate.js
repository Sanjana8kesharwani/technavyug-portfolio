// middleware/validate.js — express-validator result checker
const { validationResult } = require('express-validator');
const ApiError = require('../utils/apiError');

const validate = (req, _res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const extracted = errors.array().map((e) => ({ [e.path]: e.msg }));
    throw new ApiError(422, 'Validation failed', extracted);
  }
  next();
};

module.exports = { validate };
