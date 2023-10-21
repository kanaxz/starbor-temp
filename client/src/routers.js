const authRouter = require('management-hedera/router')
const modelingRouter = require('modeling-hedera/routing/router')

const mainLayoutRouter = require('./main/mainLayoutRouter')
const emptyLayoutRouter = require('./main/emptyLayoutRouter')

emptyLayoutRouter.use(authRouter)
mainLayoutRouter.use(modelingRouter)

module.exports = {
  emptyLayoutRouter,
  mainLayoutRouter
}