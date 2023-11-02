const template = require('./template.html')
const { String, Bool, Model, Object: ObjectType, Number } = require('modeling/types')
const { TextField, BoolField, DateField, NumberField, MarkdownField } = require('../..//fields')
const ModelField = require('../ModelField')
const Field = require('../../fields/Field')
const Markdown = require('modeling/types/Markdown')

require('./style.scss')

const typesFieldmapping = [
  [Markdown, MarkdownField],
  [String, TextField],
  [Bool, BoolField],
  [Number, NumberField],
  [Model, ModelField],
]

const getMapping = (type) => {
  return typesFieldmapping.find(([t]) => type === t || type.prototype instanceof t)
}

class ObjectFieldset extends Field {
  static typesFieldmapping = typesFieldmapping

  onInit() {
    this.updateTypes()
    if (!this.state.value && this.state.required) {
      this.create()
    }
    super.onInit()
  }

  create() {
    this.setValue(new (this.types[0])())
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
    this.types = this.state.property.type
      .getAllChilds()
      .filter((c) => !c.definition.abstract)
  }

  onValueChanged() {
    if (!this.state.value) {
      this.fields = []
      return
    }
    const type = this.state.property.type
    const properties = type.properties
    this.fields = Object.entries(this.state.states)
      .reduce((acc, [propertyName, state]) => {
        const property = properties.find((p) => p.name === propertyName)
        const mapping = getMapping(property.type)
        const fieldType = mapping[1]
        const field = new fieldType({
          state,
          childForm: this.childForm,
          fieldset: this,
          form: this.form,
        })
        acc[property.name] = field
        field.addEventListener('changed', this.b(this.onFieldChanged))
        return acc
      }, {})
  }

  onFieldChanged() {
    this.touched = true
    this.event('changed', { field: this })
  }

  showErrors() {
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