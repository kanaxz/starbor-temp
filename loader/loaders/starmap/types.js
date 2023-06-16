const { codify } = require('../../utils')
const { System, Star, Planet, LandingZone, Moon } = require('shared/models')
const getSystemPosition = (object) => {
  return ['x', 'y', 'z'].reduce((acc, axis) => {
    acc[axis] = object[`position_${axis}`]
    return acc
  }, {})
}


module.exports = ({ collections }) => {

  const save = async (entity) => {
    await collections.entities.createOrUpdate(entity)
  }

  const types = {
    system: {
      check: ({ type }) => false,
      async process(entity, json) {
        const system = new System(entity)
        system.starmap.position = getSystemPosition(json)
        await save(system)
        return system
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

        const star = new Star(entity)
        await save(star)
        return star
      }
    },
    planet: {
      check: ({ type }) => type === 'PLANET',
      async process(entity) {
        const planet = new Planet(entity)
        await save(planet)
        return planet
      }
    },
    moon: {
      check: ({ subtype }) => subtype?.name === 'Planetary Moon',
      async process(entity) {
        const moon = new Moon(entity)
        await save(moon)
        return moon
      }
    },

    landingZone: {
      check: ({ type }) => type === 'LZ',
      async process(entity) {
        const lz = new LandingZone(entity)
        await save(lz)
        return lz
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