const Component = require('@core/Component')
const template = require('./template.html')
const models = require('shared/models')
require('./style.scss')

console.log(models)
module.exports = class EditableText extends Component {

}
  .define({
    name: 'app-models-tree',
    template,
  })
  .variables({
    models: [models.locations.Location],
  })
  .properties({

  })
