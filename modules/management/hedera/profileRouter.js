const Router = require('hedera/routing/routers/Router')
const context = require('core-client/context')

const router = new Router()

router.use((req, res, next) => {
  if (!context.user) {
    return res.navigate('/')
  }
  return next()
})

router.route('/profile', (req, res) => {
  res.page(import('./pages/Profile'))
})

module.exports = router