const Service = require('./Service')
module.exports = (req, res, next) => {
  if (!Service.instance.me) {
    return navigator.navigate('/login')
  }
  next()
}