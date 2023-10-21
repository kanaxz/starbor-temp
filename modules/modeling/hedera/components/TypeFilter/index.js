const Component = require('hedera/Component')
const template = require('./template.html')
const mixer = require('core/mixer')
const Propertiable = require('core/mixins/Propertiable')
const Array = require('core/types/Array')
const Any = require('core/modeling/Any')

require('./style.scss')

class Segment extends mixer.extends([Propertiable]) {

}

Segment
  .define()
  .properties({
    name: 'string',
  })

class Path extends Array {

}

class Source extends mixer.extends([Propertiable]) {
  constructor(values) {
    super()
    Object.assign(this, values)
    this.type = Any
    this.path = new Array(new Segment())
    this.args = new Array()
  }

  next() {
    const value = this.nextSource.value
    if (value.type === 'property') {

    } else if (value.type === 'method') {
      this.method = value
    }
  }

  getNextSuggestions(query) {
    if (this.method) {
      if(this.args.length === this.methods.args.length){

      }
    } else {
      
    }
  }
}

Source
  .define()
  .properties({
    paths: 'any',
    method: 'any',
    args: 'any',
    type
  })

module.exports = class TypeFilter extends Component {
  constructor() {
    super()
    this.sources = new Array()
    this.scope = new Scope({
      
    })
  }

  addSource() {
    this.sources.push(new Source())
  }

  getFilters() {
    return []
  }

}
  .define({
    name: 'app-type-filter',
    template,
  })
  .properties({
    type: 'any',
    filters: 'any',
  })
