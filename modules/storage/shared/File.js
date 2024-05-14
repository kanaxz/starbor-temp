
const StorageObject = require('./StorageObject')
const { String, Number } = require('modeling/types')

module.exports = class File extends StorageObject {
  static accept() {
    return true
  }

  get path() {
    return `/api/storage/${this._id}`
  }
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
    size: {
      type: Number,
      required: true,
    },
    source: {
      type: String,
      state: {
        required: true
      }
    },
  })