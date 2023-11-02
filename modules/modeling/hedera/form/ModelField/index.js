const template = require('./template.html')
const componentsService = require('../../componentsService')
const Field = require('../../fields/Field')
const ChildModelForm = require('../ChildModelForm')
require('./style.scss')

module.exports = class ModelField extends Field {
  constructor(values) {
    super(values)
    this.default()
    //this.on('propertyChanged:value', this.b(this.update))
  }

  select(model) {
    this.value = model
    this.panel.close()
  }

  default() {
    this.mode = 'default'
    this.suggestionsOpen = false
  }

  edit() {
    this.mode = 'edit'
    this.suggestionsOpen = true
    this.input.focus()
  }

  selectSuggestion(suggestion) {
    this.default()
    this.setValue(suggestion)
  }

  async onFocus() {
    await this.search()
  }

  templateSuggestion(suggestion) {
    if (!suggestion) { return null }
    const componentType = componentsService.get(suggestion.constructor, 'row')
    return new componentType(suggestion)
  }

  async search() {
    const value = this.input.value
    if (value == this.lastValue) { return }
    this.lastValue = value
    const type = this.state.property.type
    const searchField = type.definition.searchField || 'name'
    this.suggestions = await type.collection.find([
      ...(this.state.filters || []),
      {
        $match: [`$${searchField}`, value]
      }
    ], {
      limit: 3,
    })
    this.suggestionsOpen = true
  }

  async create() {
    this.mode = 'create'
    const form = new ChildModelForm({
      type: this.state.type,
      object: null,
      label: this.label,
    })

    form.addEventListener('saved', ({ model }) => {
      this.value = model
    })
    this.form.show(form)
  }

  onSaved({ model }) {
    this.setValue(model)
  }
}
  .define({
    name: 'model-field',
    template,
  })
  .properties({
    panelModel: 'any',
    mode: 'any',
    suggestions: 'any',
    suggestionsOpen: 'any',
  })
