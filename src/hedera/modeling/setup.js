
const mixer = require('sools-core/mixer')
const setup = require('sools-modeling-hedera/setup')
const { SpaceStation, Planet, Renderable } = require('starbor')
const Positionable = require('starbor/mixins/Positionable')

setup.routing.layout.header.before.push(async (model) => {
  if (!mixer.is(model, Renderable)) { return null }
  return {
    fragment: '<model-render style="width:150px; height:100%" :model="this.@model" style="height:100%;"></model-render>'
  }
})

setup.routing.actions.push({
  name: 'map',
  content: '<i class="fa-solid fa-globe"></i>',
  url: '/map',
  check(model) {
    if (!mixer.is(model, Positionable)) {
      throw new Error()
    }
  },
  async execute(req, res, next) {
    await res.page(import('./MapPage'), req.model)
  }
})