module.exports = (req, res) => {
  res.status(404).json({ error: 'does not exist' })
}
