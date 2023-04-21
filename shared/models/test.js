require('../core/modeling')
require('./GameModel')
require('./Manufacturer')
require('./items')
require('./locations')
const Ship = require('./items/Ship')

const shipsJson = [
  {
    name: 'sabre',
    manufacturer: { name: 'AEGIS' },
    slots: [
      {
        name: 'leftRack',
        type: 'missileRack',
        size: 4,
      }
    ]
  }
]

const ships = shipsJson.map((s) => Ship.build(s))
console.log(ships)
console.log(JSON.stringify(ships.map((s)=>s.toJSON()), null, ' '))
