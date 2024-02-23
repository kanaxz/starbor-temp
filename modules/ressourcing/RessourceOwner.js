const mixer = require('core/mixer')
const ModelMixin = require('modeling/types/ModelMixin')

module.exports = mixer.mixin([ModelMixin], (base) => {
  return class RessourceOwner extends base { }
})
  .define({
    name: 'ressourceOwner'
  })