const template = require('./template.html')
const Component = require('hedera/Component')
const Jwt = require('jwt/Jwt')
const context = require('core-client/context')
require('./style.scss')

module.exports = class JwtPage extends Component {
  async onInit() {
    this.createStates = { user: { hidden: true, value: context.user } }
    this.states = { user: { hidden: true, value: context.user }, id: { readOnly: true, disabled: false } }
    this.newModelStates = { ...this.states, key: { disabled: false, readOnly: true } }
    //console.log('here', this.newModelstates)
    this.jwts = await Jwt.collection.find([
      {
        $eq: ['$user._id', context.user._id]
      }
    ])
  }
  async onReady() {

  }

  onSaved({ model }) {
    this.newModel = model
  }
}
  .define({
    name: 'jwt-page',
    template,
  })
  .properties({
    jwts: 'any',
    newModel: 'any',
  })
  .variables({
    Jwt
  })