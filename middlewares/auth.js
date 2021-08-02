const jwt = require('jsonwebtoken')
require('dotenv').config()

const getToken = (req) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}
module.exports = (req, res, next) => {
  const tokenFormat = getToken(req)
  const decodeToken = jwt.verify(tokenFormat, process.env.SECRET_KEY)

  if (!decodeToken && !decodeToken.id) {
    return res.status(401).json({ error: 'wrong token or invalid' })
  }
  req.userId = decodeToken.id
  next()
}
