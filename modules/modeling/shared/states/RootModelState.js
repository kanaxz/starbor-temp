const RootObjectState = require('./RootObjectState')

module.exports = class RootModelState extends RootObjectState {

  async validate() {
    await super.validate()
    const type = this.property.type
    for (const index of type.indexes) {
      if (index.build === false || !index.unique) { continue }

      const values = index.properties.reduce((acc, propertyName) => {
        acc[propertyName] = this.states[propertyName].value
        return acc
      }, {})

      const filledValues = Object.values(values).filter((v) => v != null)
      if (filledValues.length !== index.properties.length) {
        continue
      }
      const filters = Object.entries(values)
        .map(([k, v]) => ({
          $eq: [`$${k}`, v]
        }))

      if (this.value._id) {
        filters.push({
          $neq: ['$_id', this.value._id]
        })
      }

      const existingModel = await type.collection.findOne(this.context, filters, {
        type: index.owner.definition.name,
      })

      if (!existingModel) { continue }

      if (index.properties.length > 1) {
        this.errors.push(`Values combinaison on fields '${index.properties.join(', ')}' is not available`)
      } else {
        const state = this.states[index.properties[0]]
        state.errors.push('This value is already taken')
      }
    }
  }
}
  .define()