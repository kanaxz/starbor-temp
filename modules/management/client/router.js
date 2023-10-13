const navigator = require('@app/navigator')
const AuthService = require('./AuthService')
const Router = require('hedera/routing/Router')
const context = require('hedera/context')

const router = new Router()

const notConnected = (req, res, next) => {
  if (context.me) {
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
  AuthService.instance.logout()
  return navigator.navigate('/')
})

router.route('/myprofile', (req, res) => {
  res.page(import('./pages/MyProfile'))
})

module.exports = router