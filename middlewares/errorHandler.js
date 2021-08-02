module.exports = (err, req, res, next) => {
  // console.log(err._message)
  if (err._message === 'user validation failed') {
    return res.status(400).json({
      error: 'User already exists'
    })
  } else if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'invalid token'
    })
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'expired token'
    })
  } else {
    return res.status(400).json({ error: err.message })
  }
}
