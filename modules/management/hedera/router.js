const Router = require('hedera/routing/routers/Router')
const context = require('core-client/context')
const { auth } = require('hedera/global')

const router = new Router()

const notConnected = (req, res, next) => {
  if (context.me) {
    return res.navigate('/')
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
  return res.navigate('/')
})

module.exports = router