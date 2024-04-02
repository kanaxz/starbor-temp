const template = require('./template.html')
const { navigator, auth } = require('hedera/global')
const Component = require('hedera/Component')
const Credentials = require('management/Credentials')

require('./style.scss')

module.exports = class Signup extends Component {
  async onSubmit({ object }) {
    console.log('submitting')
    await auth.signup(object)
    await navigator.navigate('/')
  }
}
  .define({
    name: 'signup-page',
    template,
  })
  .variables({
    Credentials
  })