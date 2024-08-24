const LayoutRouter = require('sools-hedera/routing/routers/LayoutRouter')
const router = new LayoutRouter({
  layout: require('../layouts/Main')
})

router.route(/^\/$/, (req, res) => {
  res.page(import('../pages/Home'))
})

router.route('/code-30000', (req, res) => {
  res.page(import('../pages/NotFound'))
})

router.route('/not-found', (req, res) => {
  res.navigate('/code-30000', true)
})

/*
router.use((req, res) => {
  res.navigate('/not-found')
})
*/

module.exports = router