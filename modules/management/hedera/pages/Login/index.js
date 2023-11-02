const template = require('./template.html')
const { auth, navigator } = require('hedera/global')
const Component = require('hedera/Component')
const Credentials = require('management/Credentials')
require('./style.scss')

module.exports = class Home extends Component {

  onInit() {

  }

  async onSubmit({ object }) {
    

    await auth.login(object)
    await navigator.navigate('/')
  }
}
  .define({
    name: 'login-page',
    template,
  })
  .variables({
    Credentials
  })