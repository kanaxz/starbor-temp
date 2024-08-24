const LayoutRouter = require('sools-hedera/routing/routers/LayoutRouter')

const router = new LayoutRouter({
  layout: require('../layouts/Empty')
})

router.route('/empty', async (req, res) => {
  await res.page(import('../pages/Empty'))
})

module.exports = router