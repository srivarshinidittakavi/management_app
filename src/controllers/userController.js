const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const userService = require('../services/userService')

exports.createUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const { name, email, password, age, role } = req.body

  const existing = await userService.findByEmail(email)
  if (existing.data) return res.status(409).json({ message: 'Email already exists' })

  const hashedPassword = await bcrypt.hash(password, 10)

  const { data, error } = await userService.createUser({
    name,
    email,
    password: hashedPassword,
    age,
    role
  })

  if (error) return res.status(500).json({ message: error.message })

  res.status(201).json(data)
}

exports.getUsers = async (req, res) => {
  const { data, error } = await userService.getAllUsers()
  if (error) return res.status(500).json({ message: error.message })
  res.json(data)
}

exports.getUser = async (req, res) => {
  const { data, error } = await userService.getUserById(req.params.id)
  if (error) return res.status(404).json({ message: 'User not found' })
  res.json(data)
}

exports.updateUser = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const updates = req.body
  if (updates.password) updates.password = await bcrypt.hash(updates.password, 10)

  const { data, error } = await userService.updateUser(req.params.id, updates)
  if (error) return res.status(404).json({ message: 'User not found' })

  res.json(data)
}

exports.deleteUser = async (req, res) => {
  const { error } = await userService.deleteUser(req.params.id)
  if (error) return res.status(404).json({ message: 'User not found' })
  res.json({ message: 'User deleted successfully' })
}
