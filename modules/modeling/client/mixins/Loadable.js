const mixer = require('core/mixer')
const context = require('core-client/context')

module.exports = mixer.mixin((base) => {
  return class Loadable extends base {
    load(...args) {
      if(args[0] !== context){
        args.unshift(context)
      }
      return super.load(...args)
    }
  }
})

