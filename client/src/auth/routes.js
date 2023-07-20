const navigator = require('@app/navigator')
const auth = require('./service')

const notConnected = (req, res, next) => {
  if (auth.me) {
    return navigator.navigate('/')
  }
  return next()
}

navigator.route('/login', notConnected, (req, res) => {
  res.page(import('./pages/Login'))
})

navigator.route('/signup', notConnected, (req, res) => {
  res.page(import('./pages/Signup'))
})

navigator.route('/logout', (req, res) => {
  auth.logout()
  return navigator.navigate('/')
})

navigator.route('/myprofile', (req, res) => {
  res.page(import('./pages/MyProfile'))
})
