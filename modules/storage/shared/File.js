
const FileSystemObject = require('./FileSystemObject')
const { String } = require('modeling/types')

module.exports = class File extends FileSystemObject {
  static accept = []
}
  .define({
    name: 'file',
  })
  .properties({
    mimetype: {
      type: String,
      state: {
        required: true,
      }
    },
    source: {
      type: String,
      state:{
        required: true
      }
    },
  })