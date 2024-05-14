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
const { buildCollections } = require('modeling-client')
require('./modeling/setup')
buildCollections(STARBOR_CONFIG.server.url)


Object.assign(global.components, {
  Loader,
  Interface,
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