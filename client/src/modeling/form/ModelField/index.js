const Component = require('hedera/Component')
const template = require('./template.html')
const componentsService = require('@app/main/componentsService')
const { String, Bool, Model, Object, Number } = require('core/modeling/types')
const { TextField, BoolField, DateField, NumberField, MarkdownField } = require('@app/fields')
const Field = require('@app/fields/Field')
const Markdown = require('shared/types/Markdown')
const ChildModelForm = require('../ChildModelForm')
require('./style.scss')

module.exports = class ModelField extends Field {
  constructor(values) {
    super(values)
    this.mode = 'default'
    //this.on('propertyChanged:value', this.b(this.update))
  }

  select(model) {
    this.value = model
    this.panel.close()
  }

  default(fromExit) {
    this.mode = 'default'
    this.suggestionsOpen = false
  }

  edit() {
    this.mode = 'edit'
    this.suggestionsOpen = true
    this.input.focus()
  }

  templateValue() {
    if (!this.value) { return null }
    console.log(this.value)
    const componentType = componentsService.get(this.value.constructor, 'row')
    return new componentType(this.value)
  }

  selectSuggestion(suggestion) {
    this.default()
    this.setValue(suggestion)
  }

  async onFocus() {
    await this.search('')
  }

  templateSuggestion(suggestion) {
    const componentType = componentsService.get(suggestion.constructor, 'row')
    return new componentType(suggestion)
  }

  async search(value) {
    const searchField = this.type.definition.searchField || 'name'
    this.suggestions = await this.type.collection.find([
      ...(this.filters || []),
      {
        $match: [`$${searchField}`, value]
      }
    ], {
      
      limit: 3,
    })
    this.suggestionsOpen = true
  }

  async create() {
    console.log('create')
    this.mode = 'create'
    const form = new ChildModelForm({
      type: this.type,
      model: null,
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

  template(model) {
    const componentType = componentsService.get(model.constructor, 'card')
    return new componentType(model)
  }

  importState(state) {
    super.importState(state)
    this.filters = state.filters
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
