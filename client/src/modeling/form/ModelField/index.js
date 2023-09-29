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


  edit() {
    this.mode = 'edit'
    const form = new ChildModelForm({
      type: this.type,
      model: this.value,
      label: `${this.value.toString()} (${this.label})`,
    })

    form.addEventListener('saved', ({ model }) => {
      this.value = model
    })
    this.form.show(form)
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
