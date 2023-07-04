const Component = require('hedera/Component')
const template = require('./template.html')
const service = require('../service')
require('./style.scss')

module.exports = class SidePanels extends Component {
}
  .define({
    name: 'side-panels',
    template,
  })
  .variables({
    service,
  })
  .properties({

  })
