const Row = require('modeling-hedera/components/Row')
const template = require('./template.html')
const { User } = require('management')
require('./style.scss')

module.exports = class UserRow extends Row {
  constructor(...args) {
    super(...args)
  }
}
  .define({
    name: 'user-row',
    template,
  })
  .register(User, 'row', {
    affiliation: true,
  })