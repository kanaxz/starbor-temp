const template = require('./template.html')
const Array = require('core/types/Array')
const { String, Bool, Model, Object: ObjectType, Number } = require('modeling/types')
const { TextField, BoolField, DateField, NumberField, MarkdownField } = require('../..//fields')
const ModelField = require('../ModelField')
const Field = require('../../fields/Field')
const Markdown = require('modeling/types/Markdown')
const ObjectState = require('processing/states/ObjectState')
const { File } = require('storage')
const FileField = require('../../../../storage/client/components/FileField')
require('./style.scss')

const typesFieldmapping = [
  [File, FileField],
  [Markdown, MarkdownField],
  [String, TextField],
  [Bool, BoolField],
  [Number, NumberField],
  [Model, ModelField],
]

const ignore = ['_id']

const getMapping = (type) => {
  return typesFieldmapping.find(([t]) => type === t || type.prototype instanceof t)
}

class ObjectFieldset extends Field {
  constructor(values) {
    super(values)
    this.on('propertyChanged:type', this.b(this.updateTypes))
    this.on('propertyChanged:currentOption', this.b(this.onSelectedTypeChanged))
  }

  onInit() {
    this.updateTypes()
    console.log(this, this.value)
    if (!this.value && this.required) {
      this.value = new (this.types[0].value)()
    }
  }

  onSelectedTypeChanged(type) {
    if (this.value?.constructor === type) { return }
    let value
    if (type) {
      const oldValue = this.value
      value = new type()
      Object.assign(value, oldValue)
    } else {
      value = null
    }

    this.setValue(value)
  }

  async updateTypes() {
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

    if (!this.required) {
      this.types.unshift({
        label: 'NULL',
        value: null
      })
    }
  }

  updateFields(state) {
    if (this.lastValue === this.value) {
      return
    }
    this.lastValue = this.value
    if (!this.value) {
      this.fields = []
      return
    }
    const type = this.value.constructor
    const properties = type.properties

    this.fields = Object.entries(state.states)
      .reduce((acc, [propertyName, state]) => {
        const property = properties.find((p) => p.name === propertyName)
        const value = this.value[property.name]

        const mapping = getMapping(property.type)
        const fieldType = mapping[1]
        const field = new fieldType({
          property,
          type: property.type,
          label: property.name,
          name: property.name,
          childForm: this.childForm,
          fieldset: this,
          form: this.form,
          value,
        })
        acc[field.name] = field
        field.addEventListener('changed', this.b(this.onFieldChanged))
        return acc
      }, {})
  }

  importState(state) {
    super.importState(state)
    this.updateFields(state)
    Object.entries(state.states)
      .forEach(([propertyName, state]) => {
        if (this.value) {
          this.value[propertyName] = state.value
        }

        const field = this.fields[propertyName]
        if (!field) { return }

        field.importState(state)
      })
  }

  onFieldChanged({ field }) {
    this.value[field.name] = field.value
    this.touched = true
    this.event('changed', { field: this })
  }

  showErrors() {
    console.log('showing errors')
    this.touched = true
    Object.values(this.fields)
      .forEach((field) => {
        if (field.showErrors) {
          field.showErrors()
        } else {
          field.touched = true
        }
      })
  }
}

typesFieldmapping.push([ObjectType, ObjectFieldset])

ObjectFieldset
  .define({
    name: 'object-fieldset',
    template,
  })
  .properties({
    types: 'any',
    fields: 'any',
  })

module.exports = ObjectFieldset