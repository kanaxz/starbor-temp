require('modeling-client/setup')
const hederaSetup = require('hedera/setup')
const Holder = require('modeling-client/mixins/Holder')

hederaSetup.base.push(Holder)

module.exports = {
  routing: require('./routing/setup')
}