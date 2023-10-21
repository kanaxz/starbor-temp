const template = require('./template.html')
const { navigator, auth } = require('hedera/global')
const Component = require('hedera/Component')

require('./style.scss')

module.exports = class Signup extends Component {
  async onSubmit() {
    console.log('submitting')
    const inputs = [...this.form.querySelectorAll('input')]
    const values = inputs.reduce((acc, input) => {
      acc[input.name] = input.value
      return acc
    }, {})

    await auth.signup(values)
    await navigator.navigate('/')
  }
}.define({
  name: 'signup-page',
  template,
})