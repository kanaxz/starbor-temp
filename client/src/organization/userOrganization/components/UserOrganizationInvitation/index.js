const Component = require('/workspace/star-citizen-universe/modules/hedera/Component')
const api = require('@app/api')
const template = require('./template.html')
const invitation = require('shared/types/models/Invitation.js')

require('./style.scss')

module.exports = class UserOrganizationInvitation extends Component {
  constructor(invitation) {
    super();
    this.invitation = {
      userOrganization: {
        name: 'My Organization',
      },
      user: {
        name: 'Albane',
      },
      initiation: 'organization',
      status: 'pending'
    }
  }

  async initialize() {
    await super.initialize()
    await this.update()
  }
}
  .define({
    name: 'user-organization-invitation',
    template
  })
  .properties({

  })