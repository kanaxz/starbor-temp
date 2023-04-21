const { codify } = require('../../utils')

const getSystemPosition = (object) => {
  return ['x', 'y', 'z'].reduce((acc, axis) => {
    acc[axis] = object[`position_${axis}`]
    return acc
  }, {})
}


module.exports = ({ locations }) => {
  //console.log(locations)
  const saveLocation = async (location) => {
    location._id = codify(location.name)
    const locationJson = {
      ...location,
      parent: location.parent?._id,
    }

    delete locationJson.json

    await locations.save(locationJson, true)
  }

  const types = {
    system: {
      check: ({ type }) => false,
      async process(location) {
        location['@type'] = 'system'
        location.starmap.position = getSystemPosition(location.json)
        await saveLocation(location)
      }
    },
    star: {
      check: ({ type }) => type === 'STAR',
      async process(location) {
        Object.assign(location, {
          '@type': 'star',
          name: `${location.name} star`,
          type: location.json.subtype?.name
        })

        await saveLocation(location)
        return true
      }
    },
    planet: {
      check: ({ type }) => type === 'PLANET',
      async process(location) {
        location['@type'] = 'planet'
        await saveLocation(location)
      }
    },
    landingZone: {
      check: ({ type }) => type === 'LZ',
      async process(location) {
        location['@type'] = 'landingZone'
        await saveLocation(location)
      }
    },
    jumpPoint: {
      check: ({ type }) => type === 'JUMPPOINT',
      async process(location) {
        let [, otherSystemName] = location.json.designation.split('-')
        otherSystemName = otherSystemName.trim()
        const otherSystem = locations.entries.find((l) => {
          return l['@type'] === 'system' && l.name === otherSystemName
        })
        if (!otherSystem) {
          return false
        }
        Object.assign(location, {
          '@type': 'jumpPoint',
          name: `${location.parent._id} ${otherSystem._id}`,
          destination: otherSystem._id,
        })
        await saveLocation(location)
      }
    },
    asteroidBelt: {
      check: ({ type }) => type === 'ASTEROID_BELT',
      async process(location) {
        location['@type'] = 'asteroidBelt'
        await saveLocation(location)
      }
    },
    asteroidField: {
      check: ({ type }) => type === 'ASTEROID_FIELD',
      async process(location) {
        location['@type'] = 'asteroidField'
        await saveLocation(location)
      }
    },
    poi: {
      check: ({ type }) => type === 'POI',
      async process(location) {
        location['@type'] = 'poi'
        await saveLocation(location)
      }
    },
    moon: {
      check: ({ subtype }) => subtype?.name === 'Planetary Moon',
      async process(location) {
        location['@type'] = 'moon'
        await saveLocation(location)
      }
    },
    spaceStation: {
      check: ({ type }) => type === 'MANMADE',
      async process(location) {
        location['@type'] = 'spaceStation'
        await saveLocation(location)
      }
    }
  }
  return types
}