const template = require('./template.html')
const Component = require('sools-hedera/Component')
require('./style.scss')

module.exports = class NotFound extends Component {

}.define({
  name: 'not-found-page',
  template,
})