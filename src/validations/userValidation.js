const { body, param } = require('express-validator')

exports.createUserValidation = [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('age').optional().isInt({ min: 18 })
]

exports.updateUserValidation = [
  param('id').isUUID(),
  body('email').optional().isEmail(),
  body('password').optional().isLength({ min: 8 }),
  body('age').optional().isInt({ min: 18 })
]

exports.idValidation = [
  param('id').isUUID()
]
