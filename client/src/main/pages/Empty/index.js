const template = require('./template.html')
const Component = require('hedera/Component')
require('./style.scss')
require('./ChildChild')

module.exports = class EmptyPage extends Component {

}
  .define({
    name: 'empty-page',
    template,
  })

