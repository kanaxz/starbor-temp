const setup = require('modeling-hedera/setup')
const context = require('core-client/context')

setup.routing.actions.push({
  url: '/jwt',
  content: '<i class="fa-solid fa-key"></i>',
  check(user) {
    return context.user === user
  },
  async execute(req, res, next) {
    await res.page(import('./pages/Jwt'))
  }
})