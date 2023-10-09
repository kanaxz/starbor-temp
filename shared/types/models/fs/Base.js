const { Model, String } = require('core/modeling/types')

module.exports = class Base extends Model {

}
  .define({
    name: 'fileSystemObject',
    pluralName:'filesystem',
    abstract: true,
    root: true,
  })
  .properties({
    name: {
      type: String,
      state: {
        required: true
      },
    },
    path: {
      type: String,
      state: {
        required: true,
      }
    },
  })
  .indexes({
    path: {
      properties: ['path'],
      unique: true,
    }
  })