const mixer = require('core/mixer')
const setup = require('modeling-hedera/setup')
const Imageable = require('storage/mixins/Imageable')

setup.routing.layout.header.before.push(async (model) => {
  if (!mixer.is(model, Imageable)) { return null }
  await model.image?.load()
  return {
    fragment: '<img class="imageable-image" :src="this.@model?.image?.path">'
  }
})