const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, nesxt) {
  // Get token from header
  const token = req.header('x-auth-token')

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'))

    req.user = decoded.user
    nesxt()
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' })
  }
}