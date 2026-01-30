const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')
const validation = require('../validations/userValidation')

router.post('/', validation.createUserValidation, controller.createUser)
router.get('/', controller.getUsers)
router.get('/:id', validation.idValidation, controller.getUser)
router.put('/:id', validation.updateUserValidation, controller.updateUser)
router.delete('/:id', validation.idValidation, controller.deleteUser)

module.exports = router
