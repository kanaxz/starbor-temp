const setup = require('modeling-hedera/setup')
const mixer = require('core/mixer')
const Wikiable = require('wiki/mixins/Wikiable')

setup.routing.actions.unshift({
  name: 'wiki',
  content: '<i class="fa-solid fa-file-lines"></i>',
  url: '',
  check(model) {
    return mixer.is(model, Wikiable)
  },
  async execute(req, res, next) {
    await res.page(import('./WikiPage'), req.model)
  }
})