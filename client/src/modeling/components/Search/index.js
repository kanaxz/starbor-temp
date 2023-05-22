const Component = require('@core/Component')
const template = require('./template.html')
const Searchable = require('core/modeling/mixins/Searchable')
const Propertiable = require('core/mixins/Propertiable')
const mixer = require('core/mixer')
const componentsService = require('../../../main/componentsService')
require('./style.scss')

class SearchableResults extends mixer.extends([Propertiable]) {
  constructor(type) {
    super()
    this.type = type
    this.initialize()
  }

  async search(key) {
    this.error = false
    this.loading = true
    try {
      this.results = await this.type.collection.find([{
        $match: [`$${this.type.definition.searchField}`, key]
      }], {
        limit: 3
      })
    } catch (e) {
      this.error = e.message
    } finally {
      this.loading = false
    }
  }
}

SearchableResults
  .define()
  .properties({
    loading: 'bool',
    results: 'any',
    error: 'bool',
  })

module.exports = class Search extends Component {
  constructor() {
    super()
    this.searchables = Searchable.definition.childs.map((child) => {
      return new SearchableResults(child)
    })
  }

  start() {
    this.open = true
    this.search()
  }

  search() {
    this.searchables.forEach((searchable) => {
      searchable.search(this.input.value)
    })
  }

  templateRow(result) {
    const rowComponent = componentsService.get(result.constructor, 'row')
    return new rowComponent(result)
  }
}
  .define({
    name: 'app-search',
    template,
  })
  .properties({
    results: 'any',
    open: 'any',
  })
