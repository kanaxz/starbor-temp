
const Base = require('./Base')
const { String } = require('core/modeling/types')


module.exports = class File extends Base {

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