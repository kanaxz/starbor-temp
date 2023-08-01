const Page = require('hedera/page/Page')
const Main = require('@app/layouts/Main')
const template = require('./template.html')
const navigator = require('@app/navigator')
const collections = require('../../../../api')
const CreateUserOrganization = require('../../components/CreateUserOrganization')

require('./style.scss')

module.exports = class UsersOrganizations extends Page {
  constructor() {
    super()
    this.CreateNewOrgIsOpen = false

  }
}.define({
  name: 'users-organizations',
  template,
  layout: Main,
})
  .properties({
    CreateNewOrgIsOpen: 'any',
  })
  .variables({
    collections,
  })