
module.exports = (req, res, next) => {
  if (!auth.me) {
    return navigator.navigate('/login')
  }
  next()
}