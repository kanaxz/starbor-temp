require('sools-core/setup')

// hedera
require('sools-modeling-hedera/setup')
require('ressourcing/setup')
require('jwt-hedera/setup')
require('sools-wiki-hedera/setup')
require('storage-hedera/setup')
require('sools-auth-hedera/setup')
require('sools-core-hedera/setup')
require('sools-hedera/setup')


require('jwt')
require('starbor')

const global = require('./global')
const Loader = require('./components/Loader')
const Interface = require('./components/Interface')
const { buildCollections } = require('sools-modeling-client')
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
require('sools-hedera')
require('sools-auth-hedera')
require('storage-hedera')
require('sools-modeling-hedera')


// local sources
require('./style.scss')
require('./modeling')
require('./components')