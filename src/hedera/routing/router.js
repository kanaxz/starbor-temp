const authRouter = require('sools-auth-hedera/router')
const modelingRouter = require('sools-modeling-hedera/routing/router')
const storageRouter = require('storage-hedera/router')
const Router = require('sools-hedera/routing/routers/Router')
const mainLayoutRouter = require('./mainLayoutRouter')
const emptyLayoutRouter = require('./emptyLayoutRouter')

emptyLayoutRouter.use(authRouter)
mainLayoutRouter.use(modelingRouter)
mainLayoutRouter.use(storageRouter)

const router = new Router()

router.use(mainLayoutRouter)
router.use(emptyLayoutRouter)

router.use((req, res) => {
  res.navigate('/code-30000', true)
})

module.exports = router
