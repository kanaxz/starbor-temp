const Little = require('modeling-client/components/Little')
const template = require('./template.html')
const { Organization } = require('shared/types')
require('./style.scss')

module.exports = class OrganizationLittle extends Little { }
  .define({
    name: 'organization-little',
    template,
  })
  .register(Organization, 'little')

