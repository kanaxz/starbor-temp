const authRouter = require('management-hedera/router')
const modelingRouter = require('modeling-hedera/routing/router')
const storageRouter = require('storage-hedera/router')
const mainLayoutRouter = require('./main/mainLayoutRouter')
const emptyLayoutRouter = require('./main/emptyLayoutRouter')

emptyLayoutRouter.use(authRouter)
mainLayoutRouter.use(modelingRouter)
mainLayoutRouter.use(storageRouter)
module.exports = {
  emptyLayoutRouter,
  mainLayoutRouter
}