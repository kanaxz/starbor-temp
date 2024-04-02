const mixer = require('core/mixer')
const setup = require('modeling-hedera/setup')
const Mapeable = require('../../../modules/starbor/shared/mixins/Mapeable')

setup.routing.actions.push({
  name: 'map',
  content: '<i class="fa-solid fa-globe"></i>',
  url: '/map',
  check(model) {
    if(!mixer.is(model, Mapeable)){
      throw new Error()
    }
  },
  async execute(req, res, next) {
    await res.page(import('./MapPage'), req.model)
  }
})