const { codify } = require('../../utils')
const { System, Star, Planet, LandingZone, Moon, GroundLocation, Entity, SpaceStation } = require('starbor/types')

module.exports = [
  [Star, ({ type }) => type === 'STAR', async (star, json) => {
    const name = `${star.name} star`
    Object.assign(star, {
      name,
      type: json.subtype?.name,
      code: codify(name),
    })

  }],
  [Planet, ({ type }) => type === 'PLANET'],
  [Moon, ({ subtype }) => subtype?.name === 'Planetary Moon'],
  [SpaceStation, ({ type }) => type === 'MANMADE'],
  /*
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
  */

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
  
  */
]


