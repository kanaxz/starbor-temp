const { codify } = require('../../../utils')

module.exports = ({ db, labels, locations }) => {
  

  const saveLocation = async (location, upsert = false) => {
    const locationJson = {
      ...location,
      parent: location.parent?._id,
    }

    delete locationJson.childs
    delete locationJson.json
    
    await locations.save(locationJson, upsert)
  }

  const types = {
    /*
    */
    star: {
      ref: '80846bb9-e389-411f-b50f-f65f3b639b1d',
      // no need to attach name as it should already exist from starmap site
      async process(location) {
        Object.assign(location, {
          '@type': 'star',
          name: `${location.name} star`,
          parent: {
            _id: codify(location.name),
          }
        })

        await saveLocation(location)
      }
    },
    planet: {
      ref: '73efbf7b-a595-49df-b99f-f3fe75558d8a',
      async process(location) {
        Object.assign(location, {
          '@type': 'planet',
          shortName: location.name.substring(0, 3).toUpperCase(),
        })
        await saveLocation(location)
      }
    },
    lagrangePoint: {
      ref: '4895b5bb-94ac-470a-bf6f-084a54a09be5',
      async process(location) {
        const split = location.starcitizen.className.split('_')
        if (split.length === 3) {
          await types.spaceStation.process(location)
          return
        }
        location['@type'] = 'lagrangePoint'
        await saveLocation(location, true)
      }
    },
    spaceStation: {
      ref: '3819ac97-18f1-499e-9729-b889172da3f8',
      async process(location) {
        location['@type'] = 'spaceStation'
        await saveLocation(location, true)
      }
    },
    moon: {
      ref: '4af1132e-d980-482d-823f-f713a196b9aa',
      async process(location) {
        Object.assign(location, {
          '@type': 'moon',
          designation: location.starcitizen.className.split(/(?=[0-9])/).join(' '),
        })
        console.log(location.name)
        await saveLocation(location)
      }
    },
    outpost: {
      ref: 'e207a1ec-1395-4c1c-8e51-b38c4420784c',
      async process(location) {
        Object.assign(location, {
          '@type': 'outpost',
        })
        await saveLocation(location, true)
      }
    },
    raceTrack: {
      ref: 'c7f1393f-8cb3-4ac8-9dc7-75671c1b07fe',
      async process(location) {
        Object.assign(location, {
          '@type': 'raceTrack',
        })
        await saveLocation(location, true)
      }
    },
    city: {
      ref: 'd68b137c-28c4-4c14-8a29-19e83a586b6d',
      async process(location) {
        Object.assign(location, {
          '@type': 'city',
        })
        await saveLocation(location, true)
      }
    },
    asteroidField: {
      ref: 'e60452a5-b85c-4ab1-97e7-9cefb466f87b',
      async process(location) {
        if (!location.parent) {
          return
        }
        Object.assign(location, {
          '@type': 'asteroidField',
          name: `${location.parent.name} mining claim`
        })
        await saveLocation(location, true)
      }
    }
    /**/
  }
  return types
}