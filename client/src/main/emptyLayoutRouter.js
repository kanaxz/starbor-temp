const LayoutRouter = require('hedera/routing/routers/LayoutRouter')

const router = new LayoutRouter({
  layout: require('./layouts/Empty')
})

module.exports = router