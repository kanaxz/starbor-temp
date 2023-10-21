const context = require('core-client-shared/context')
module.exports = (req, res, next) => {
  if (!context.user) {
    return navigator.navigate('/login')
  }
  next()
}