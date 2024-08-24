const Row = require('sools-modeling-hedera/components/Row')
const template = require('./template.html')
const { Organization } = require('starbor')
require('./style.scss')

module.exports = class AffiliationRow extends Row { }
  .define({
    name: 'organization-row',
    template,
  })
  .register(Organization, 'row')
