const template = require('./template.html')
const Component = require('hedera/Component')

require('./style.scss')

module.exports = class JwtPage extends Component {
  async onReady(){
    
  }
}.define({
  name: 'jwt-page',
  template,
})