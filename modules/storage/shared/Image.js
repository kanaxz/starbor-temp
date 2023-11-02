
const File = require('./File')

module.exports = class Image extends File {
  static accept = ['image/*']
}
  .define({
    name: 'image',
  })
  .properties({

  })