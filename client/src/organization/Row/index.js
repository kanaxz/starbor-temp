const Row = require('@app/modeling/components/Row')
const template = require('./template.html')
const Organization = require('shared/models/Organization')
require('./style.scss')

module.exports = class AffiliationRow extends Row { }
  .define({
    name: 'organization-row',
    template,
  })
  .register(Organization, 'row')
