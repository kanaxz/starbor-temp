const navigator = require('@app/navigator')
const auth = require('./Service')
const Router = require('hedera/routing/Router')

const router = new Router()

const notConnected = (req, res, next) => {
  if (auth.me) {
    return navigator.navigate('/')
  }
  return next()
}

router.route('/login', notConnected, (req, res) => {
  res.page(import('./pages/Login'))
})

router.route('/signup', notConnected, (req, res) => {
  res.page(import('./pages/Signup'))
})

router.route('/logout', (req, res) => {
  auth.logout()
  return navigator.navigate('/')
})

router.route('/myprofile', (req, res) => {
  res.page(import('./pages/MyProfile'))
})

module.exports = router