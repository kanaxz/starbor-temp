const Little = require('modeling-hedera/components/Little')
const template = require('./template.html')
const { Organization } = require('starbor-shared/types')
require('./style.scss')

module.exports = class OrganizationLittle extends Little { }
  .define({
    name: 'organization-little',
    template,
  })
  .register(Organization, 'little')

