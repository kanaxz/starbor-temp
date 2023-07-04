const Component = require('hedera/Component')
const template = require('./template.html')
const componentsService = require('@app/main/componentsService')
const { String, Bool, Model, Object, Number } = require('core/modeling/types')
const { TextField, BoolField, DateField, NumberField, MarkdownField } = require('@app/fields')
const Field = require('@app/fields/Field')
const Markdown = require('shared/types/Markdown')
require('./style.scss')

module.exports = class ModelField extends Field {
  constructor(values) {
    super(values)
    this.mode = null
    //this.on('propertyChanged:value', this.b(this.update))
  }

  initialize() {
    //this.update()
    return super.initialize()
  }


  select(model) {
    this.value = model
    this.panel.close()
  }

  templateValue() {
    if (!this.value) { return null }
    console.log(this.value)
    const componentType = componentsService.get(this.value.constructor, 'card')
    return new componentType(this.value)
  }


  search() {
    this.mode = this.mode === 'search' ? null : 'search'
  }

  async create() {
    console.log('create')
    this.mode = 'create'
    this.form.type = this.type
    this.form.model = null
    await this.panel.show(this)
  }


  edit() {
    this.mode = 'edit'
    this.panel.show(this)
  }

  onSaved({ model }) {
    this.value = model
  }

  template(model) {
    const componentType = componentsService.get(model.constructor, 'card')
    return new componentType(model)
  }
}
  .define({
    name: 'model-field',
    template,
  })
  .properties({
    panelModel: 'any',
    mode: 'any',
  })
