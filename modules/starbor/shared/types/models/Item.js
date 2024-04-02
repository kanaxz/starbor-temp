const Model = require('../core/modeling')
const Manufacturer = require('./Manufacturer')

module.exports = class Item extends Model {

}.properties({
  health: 'string',
  type: 'string',
  subType: 'string',
  size: 'number',
  grade: "string",
  name: 'string',
  shortName: 'string',
  description: 'string',
  mass: 'number',
  manufacturer: Manufacturer,
})