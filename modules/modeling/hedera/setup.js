require('modeling-client/setup')
const hederaSetup = require('hedera/setup')
const Holder = require('modeling-client/mixins/holding/Holder')
const setup = require('modeling/setup')
const StateMixin = require('./StateMixin')
setup.state.push(StateMixin)

hederaSetup.base.push(Holder)

module.exports = {
  routing: require('./routing/setup')
}