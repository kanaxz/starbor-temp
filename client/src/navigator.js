const Navigator = require('hedera/routing/Navigator')
const navigator = new Navigator()
const authRouter = require('management-client/router')
navigator.use(authRouter)
module.exports = navigator