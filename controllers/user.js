const userRouter = require('express').Router()
const userValidation = require('../validations/user')
const bcrypt = require('bcrypt')
const User = require('../models/User')
userRouter.post('/', async (req, res, next) => {
  try {
    const { name, username, email, password } = await userValidation.validateAsync({ ...req.body })
    const normalizedEmail = email.toLowerCase().trim()
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
      name,
      username,
      email: normalizedEmail,
      passwordHash
    })
    const savedUser = await user.save()
    res.json(savedUser).end()
  } catch (err) {
    next(err)
  }
})
module.exports = userRouter
