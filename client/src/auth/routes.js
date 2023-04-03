const navigator = require('@app/navigator')
const service = require('./service')

navigator.route('/login', (req, res) => {
  if (service.me) {
    return navigator.navigate('/')
  }
  res.page(import('./Login'))
})

navigator.route('/logout', (req, res) => {
  service.logout()
  return navigator.navigate('/')
})

navigator.use((req, res, next) => {
  if (!service.me) {
    return navigator.navigate('/login')
  }
  next()
})