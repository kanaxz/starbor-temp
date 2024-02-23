const mixer = require('core/mixer')
const RessourceOwner = require('./RessourceOwner')

module.exports = mixer.mixin([RessourceOwner], (base) => {
  return class RessourceGroupMixin extends base {
   
  }
})