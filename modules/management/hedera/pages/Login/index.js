const template = require('./template.html')
const { auth, navigator } = require('hedera/global')
const Component = require('hedera/Component')

require('./style.scss')

module.exports = class Home extends Component {
  async onSubmit() {
    console.log('submitting')
    const inputs = [...this.form.querySelectorAll('input')]
    const values = inputs.reduce((acc, input) => {
      acc[input.name] = input.value
      return acc
    }, {})

    await auth.login(values)
    await navigator.navigate('/')
  }
}.define({
  name: 'login-page',
  template,
})