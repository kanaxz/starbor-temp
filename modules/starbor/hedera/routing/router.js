const authRouter = require('management-hedera/router')
const modelingRouter = require('modeling-hedera/routing/router')
const storageRouter = require('storage-hedera/router')
const Router = require('hedera/routing/routers/Router')
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
