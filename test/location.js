require('core')
const { System, Starmap } = require('shared/models')

const system = new System({
  starmap: {
    id: 2
  }
})

console.log(system)