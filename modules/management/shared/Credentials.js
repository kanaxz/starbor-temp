const mixer = require("core/mixer");
const { Object, String, Password } = require("modeling/types");

module.exports = class Credentials extends mixer.extends(Object) {

}
  .define()
  .properties({
    username: {
      type: String,
      state: {
        required: true
      }
    },
    password: {
      type: Password,
      state: {
        required: true,
      }
    }
  })