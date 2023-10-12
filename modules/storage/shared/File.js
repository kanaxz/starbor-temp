
const FileSystemObject = require('./FileSystemObject')
const { String } = require('modeling/types')

module.exports = class File extends FileSystemObject {
  static accept = []
}
  .define({
    name: 'file',
  })
  .properties({
    type: {
      type: String,
      state: {
        disabled: true,
      }
    },
  })