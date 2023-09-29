const Component = require('hedera/Component')
const template = require('./template.html')
const componentsService = require('@app/main/componentsService')
const { String, Bool, Model, Object, Number } = require('core/modeling/types')
const { TextField, BoolField, DateField, NumberField, MarkdownField } = require('@app/fields')
const ModelField = require('../ModelField')
const Field = require('@app/fields/Field')
const Markdown = require('shared/types/Markdown')
require('./style.scss')

const typesFieldmapping = [
  [Markdown, MarkdownField],
  [String, TextField],
  [Bool, BoolField],
  [Number, NumberField],
  [Model, ModelField],
]

const ignore = ['_id']

class ObjectFieldset extends Field {
  constructor(values) {
    super(values)
    this.on('propertyChanged:value', this.b(this.updateTimeout))
    this.on('propertyChanged:type', this.b(this.updateType))
    this.on('propertyChanged:currentOption', this.b(this.onCurrentOptionChanged))
  }

  initialize() {
    this.updateType()
    this.update()
    return super.initialize()
  }

  async updateTimeout() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    this.timeout = setTimeout(() => {
      this.update()
    }, 1)
  }

  async onCurrentOptionChanged(){
    this.update()
    this.childForm.updateStates()
  }

  async updateType() {
    if (!this.type) {
      this.types = []
      return
    }
    this.types = this.type
      .getAllChilds()
      .filter((c) => !c.definition.abstract)
      .map((c) => ({
        label: c.definition.name,
        value: c,
      }))

    this.currentOption = this.types[0]

    if (!this.required) {
      this.types.unshift({
        label: 'NULL',
        value: null
      })
    }
  }

  onTypeChanged({ option }) {
    this.currentOption = option
  }

  update() {
    if (!this.currentOption?.value) {
      this.fields = []
      return
    }

    this.fields = this.currentOption.value.properties
      .map((property) => {
        const shouldIgnore = ignore.indexOf(property.name) !== -1
        if (shouldIgnore) { return null }
        if (property.context === false) { return null }
        const mapping = typesFieldmapping.find(([type]) => property.type === type || property.type.prototype instanceof type)
        if (!mapping) { return null }

        const fieldType = mapping[1]
        const value = this.value && this.value[property.name]

        return new fieldType({
          type: property.type,
          label: property.name,
          name: property.name,
          childForm: this.childForm,
          fieldset: this,
          form: this.form,
          state: new fieldType.stateType({
            ...(property.state || {}),
            value
          })
        })
      })
      .filter((o) => o)

    this.state.states = this.fields.reduce((acc, f) => {
      acc[f.name] = f.state
      return acc
    }, {})
  }

  getValue() {
    if (!this.currentOption) {
      return null
    }
    const value = this.fields.reduce((acc, field) => {
      acc[field.name] = field.getValue()
      return acc
    }, {})
    value['@type'] = this.currentOption.value.definition.name
    return value
  }

}

typesFieldmapping.push([Object, ObjectFieldset])

ObjectFieldset
  .define({
    name: 'object-fieldset',
    template,
  })
  .properties({
    types: 'any',
    currentOption: 'any',
    fields: 'any',
  })

module.exports = ObjectFieldset