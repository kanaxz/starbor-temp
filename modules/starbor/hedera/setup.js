require('core/setup')

// hedera
require('modeling-hedera/setup')
require('ressourcing/setup')
require('jwt-hedera/setup')
require('wiki-hedera/setup')
require('storage-hedera/setup')
require('management-hedera/setup')
require('core-hedera/setup')
require('hedera/setup')


require('jwt')
require('starbor')

const global = require('./global')
const Loader = require('./components/Loader')
const Interface = require('./components/Interface')
const mixer = require('core/mixer')
const setup = require('modeling-hedera/setup')
const Mapeable = require('starbor/mixins/Mapeable')
const { buildCollections } = require('modeling-client')

buildCollections(STARBOR_CONFIG.server.url)


Object.assign(global.components, {
  Loader,
  Interface,
})

setup.routing.actions.push({
  name: 'map',
  content: '<i class="fa-solid fa-globe"></i>',
  url: '/map',
  check(model) {
    if (!mixer.is(model, Mapeable)) {
      throw new Error()
    }
  },
  async execute(req, res, next) {
    await res.page(import('./modeling/MapPage'), req.model)
  }
})

global.menu.links.push({
  label: 'Home',
  class: 'fa-solid fa-house',
  url: '/',
})

// index
require('hedera')
require('management-hedera')
require('storage-hedera')
require('modeling-hedera')


// local sources
require('./style.scss')
require('./modeling')
require('./components')