const Component = require('hedera/Component')
const template = require('./template.html')
const Propertiable = require('core/mixins/Propertiable')
const mixer = require('core/mixer')
const componentsService = require('../../../main/componentsService')
const interaction = require('hedera/interaction')
const Pageable = require('shared/mixins/Pageable')
const Mixin = require('core/Mixin')

require('./style.scss')

class SearchableResults extends mixer.extends([Propertiable]) {
  constructor(type) {
    super()
    this.type = type
  }

  async search(key) {
    this.error = false
    this.loading = true
    try {
      this.results = await this.type.collection.find([{
        $match: [`$${this.type.search?.property || 'name'}`, key]
      }], {
        type: this.type.definition.name,
        limit: 3
      })
    } catch (e) {
      console.error(e)
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

const childs = Pageable
  .getAllChilds()
  .filter((c) => !c.definition.abstract && !(c.prototype instanceof Mixin))

module.exports = class Search extends Component {
  constructor() {
    super()
    this.searchables = childs.map((type) => {
      return new SearchableResults(type)
    })
    this.first = true
  }

  start() {
    this.open = true
    if (this.first) {
      this.search()
      this.first = false
    }

  }

  stop() {
    this.open = false
    this.input.blur()
  }

  async search() {
    const promises = this.searchables.map(async (searchable) => {
      await searchable.search(this.input.value)
    })
    await Promise.all(promises)
    interaction.selectFirst(this)
  }

  selectSuggestion(suggestion) {
    suggestion.click()
    this.stop()
  }


  empty() {
    this.input.value = ''
    this.search()
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
    length: 'any',
  })
