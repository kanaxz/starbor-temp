require('./components')
require('./form')
const mixer = require('core/mixer')
const { onBindingDestroyed, onBindingGetProperty } = require('hedera/set/index')
const Holdable = require('./mixins/Holdable')

onBindingGetProperty((binding, value) => {
  if (mixer.is(value, Holdable)) {
    if (!binding.holdables) {
      binding.holdables = []
    }
    binding.holdables.push(value)
    value.hold(binding)
  }
})

onBindingDestroyed((binding) => {
  binding.holdables?.forEach((h) => h.release(binding))
})