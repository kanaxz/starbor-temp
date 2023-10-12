const { String } = require('modeling/types')
const Access = require('./Access')

module.exports = class FolderAccess extends Access {

}
  .define({
    name: 'folderAccess'
  })
  .properties({
    add: {
      type: String,
      state: {
        choices: Access.choices,
      }
    }
  })