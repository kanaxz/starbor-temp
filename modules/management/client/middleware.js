const context = require('hedera/context')
module.exports = (req, res, next) => {
  if (!context.user) {
    return navigator.navigate('/login')
  }
  next()
}