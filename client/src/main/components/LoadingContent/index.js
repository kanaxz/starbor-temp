const Component = require('hedera/Component')
const template = require('./template.html')
require('./style.scss')

module.exports = class LoadingContent extends Component {

}
  .define({
    name: 'loading-content',
    template,
  })
  .properties({
    color: 'any',
  })

