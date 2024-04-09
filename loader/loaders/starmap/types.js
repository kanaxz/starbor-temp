const { codify } = require('../../utils')
const { gePositionFromLatLon } = require('./utils')
const { System, Star, Planet, LandingZone, Moon, Position3D, GroundLocation, Entity } = require('../../../modules/starbor/shared/types')
const getSystemPosition = (object) => {
  const values = ['x', 'y', 'z'].reduce((acc, axis) => {
    acc[axis] = parseFloat(object[`position_${axis}`])
    return acc
  }, {})

  return new Position3D(values)
}



module.exports = () => {
  const save = async (json) => {
    const entity = await Entity.collection.create(json)
    return entity
  }

  const types = {
    system: {
      check: ({ type }) => false,
      async process(entity, json) {
        const system = System.parse(entity)
        system.position = getSystemPosition(json)
        return save(system)
      }
    },
    star: {
      check: ({ type }) => type === 'STAR',
      async process(entity, json) {
        const name = `${entity.name} star`
        Object.assign(entity, {
          name,
          type: json.subtype?.name,
          code: codify(name),
        })

        const star = Star.parse(entity)
        return await save(star)        
      }
    },
    planet: {
      check: ({ type }) => type === 'PLANET',
      async process(entity, json) {
        const planet = Planet.parse({
          ...entity,
          position: gePositionFromLatLon(json),
          orbitPeriod: json.orbit_period && parseFloat(json.orbit_period),
        })
        return save(planet)
      }
    },
    moon: {
      check: ({ subtype }) => subtype?.name === 'Planetary Moon',
      async process(entity) {
        const moon = Moon.parse(entity)
        return save(moon)        
      }
    },

    landingZone: {
      check: ({ type }) => type === 'LZ',
      async process(entity) {
        const lz = LandingZone.parse(entity)
        return save(lz)
      }
    },
    poi: {
      check: ({ type }) => type === 'POI',
      async process(location) {
        const entity = GroundLocation.parse(entity)
        return save(entity)
      }
    },
    /*
    jumpPoint: {
      check: ({ type }) => type === 'JUMPPOINT',
      async process(location, json) {
        let [, otherSystemName] = json.designation.split('-')
        otherSystemName = otherSystemName.trim()

        const otherSystem = await collections.locations.findOne([
          {
            $is: ['$this', 'system']
          },
          {
            $eq: ['$name', otherSystemName]
          }
        ])
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
    spaceStation: {
      check: ({ type }) => type === 'MANMADE',
      async process(location) {
        location['@type'] = 'spaceStation'
        await saveLocation(location)
      }
    }
    */
  }
  return types
}