const Row = require('modeling-client/components/Row')
const template = require('./template.html')
const { Organization } = require('shared/types')
require('./style.scss')

module.exports = class AffiliationRow extends Row { }
  .define({
    name: 'organization-row',
    template,
  })
  .register(Organization, 'row')
