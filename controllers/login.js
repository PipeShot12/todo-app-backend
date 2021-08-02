const loginRouter = require('express').Router()
const loginValidation = require('../validations/login')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
require('dotenv').config()
loginRouter.post('/', async (req, res, next) => {
  try {
    const { userData, password } = await loginValidation.validateAsync({ ...req.body })
    const user = await User.findOne({ $or: [{ username: userData }, { email: userData }] })

    const correctPassword = user === null
      ? false
      : await bcrypt.compare(password, user.passwordHash)

    if (!(user && correctPassword)) {
      return res.status(400).json({ error: 'Invalid username/email or password' })
    }
    const userPayload = {
      id: user._id
    }
    const userToken = jwt.sign(userPayload, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24 * 7
    })
    res.json({
      token: userToken,
      username: user.username
    })
  } catch (err) {
    next(err)
  }
})
module.exports = loginRouter
