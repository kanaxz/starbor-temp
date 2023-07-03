const Component = require('/workspace/star-citizen-universe/modules/hedera/Component')
const api = require('@app/api')
const template = require('./template.html')
const entities = require('shared/types/models/entities')

require('./style.scss')

// Request to find entities
/*
module.exports = class EntitiesList extends Component {

  async initialize() {
    await super.initialize()
    await this.update()
  }

  async update() {
    //request
    this.entities = await api.collections.entities.find([
      {
        $match: [
          '$name',
          '',
        ]
      }
    ], {
      limit: 20,
    })
    console.log('---------------', this.entities)
  }

}
  .define({
    name: 'model-entities-list',
    template
  })
  .properties({
    entities: 'any'
  })
*/

// Request to count how many entities there are in the parents (use $graphlookup and $project)
// Sort by parents count
// return first 20


