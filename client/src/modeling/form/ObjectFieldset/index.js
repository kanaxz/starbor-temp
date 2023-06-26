const Component = require('hedera/Component')
const template = require('./template.html')
const componentsService = require('@app/main/componentsService')
const { String, Bool, Model, Object, Number } = require('core/modeling/types')
const { TextField, BoolField, DateField, NumberField, MarkdownField } = require('@app/fields')
const Field = require('@app/fields/Field')
const Markdown = require('shared/types/Markdown')
require('./style.scss')

const typesFieldmapping = [
  [Markdown, MarkdownField],
  [String, TextField],
  [Bool, BoolField],
  [Number, NumberField],
]

const ignore = ['_id']


class ObjectFieldset extends Field {
  constructor(values) {
    super(values)
    this.on('propertyChanged:value', this.b(this.update))
  }

  initialize() {
    this.update()
    return super.initialize()
  }

  async update() {
    console.log('update fielset')
    this.fields = this.type.properties
      .map((property) => {
        if (property.type.prototype instanceof Model) { return null }
        const shouldIgnore = ignore.indexOf(property.name) !== -1
        if (shouldIgnore) { return null }
        if (property.context === false) { return null }
        const mapping = typesFieldmapping.find(([type]) => property.type === type || property.type.prototype instanceof type)
        if (!mapping) { return null }

        const fieldType = mapping[1]
        const value = this.value && this.value[property.name]
        console.log({
          name: property.name,
          fieldType: fieldType.name,
          value,
        })
        return new fieldType({
          type: property.type,
          value,
          label: property.name,
          name: property.name,
          required: false,
        })
      })
      .filter((o) => o)
  }

  getValue() {
    const value = this.fields.reduce((acc, field) => {
      acc[field.name] = field.getValue()
      return acc
    }, {})
    value['@type'] = this.type.definition.name
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
    fields: 'any',
  })

module.exports = ObjectFieldset