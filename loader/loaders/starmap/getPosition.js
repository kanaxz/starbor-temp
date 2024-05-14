const { Position3D, Orbit, Coordinates } = require('starbor')


const map = [
  [Position3D, ['x', 'y', 'z'].reduce((acc, n) => {
    const fn = `position_${n}`
    acc[fn] = (o, v) => o[n] = parseFloat(v)
    return acc
  }, {})
  ],
  [Orbit, {}],
  [Coordinates, {
    latitude(obj, v) {
      obj.latitude = parseFloat(v)
    },
    longitude(obj, v) {
      obj.longitude = parseFloat(v)
    },
  }]
]

module.exports = (json) => {

}