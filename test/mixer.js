const Base = require('core/Base')
const mixer = require('core/mixer')

console.log("Base", mixer.base == Base)
const mixin1 = mixer.mixin((base) => {
  return class extends base {
    static define(definition) {
      console.log('mixin1 define')
      //super.define(definition)
      return this
    }

    static a() {
      console.log('a')
    }
  }
})
console.log(mixin1.allDependencies)

const mixin2 = mixer.mixin([mixin1], (base) => {
  return class extends base {
    static define(definition) {
      console.log('mixin2 define')
      super.define(definition)
      return this
    }
  }
})

mixin2.define({
  name: 'mixinName',
})

mixin2.a()