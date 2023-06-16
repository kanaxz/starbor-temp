const { Organization, Starmap, Star } = require('shared/models')
const { starmapRequest, gePositionFromLatLon } = require('./utils')
const { codify } = require('../../utils')

module.exports = async (bootup, services) => {
  const types = require('./types')(services)

  const buildFromJson = async (json, parent) => {
    const name = (json.name || json.designation).split('(')[0].trim()
    const affiliation = json.affiliation[0]
    let organization
    if (affiliation) {
      organization = new Organization({
        code: codify(affiliation.code),
      })
      await organization.load()
    }
    return {
      code: codify(name),
      starmap: new Starmap({
        id: json.id,
        position: gePositionFromLatLon(json),
        'orbitPeriod': json.orbit_period,
      }),
      organization,
      name,
      designation: json.designation,
      description: json.description,
      image: json.thumbnail?.source,
      parent,
    }
  }

  const processChilds = async (celestialObjects, parent) => {
    if (parent instanceof Star) {
      parent = parent.parent
    }
    for (const celestialObject of celestialObjects) {
      if (parent instanceof Star) {
        parent = parent.parent
      }
      const type = Object.values(types).find((type) => type.check(celestialObject))
      if (!type) {
        /*
        console.log(celestialObject.type, celestialObject.subtype?.name)
        console.log(JSON.stringify(celestialObject))
        //process.exit()
        */
        continue
      }
      const { resultset: [json] } = await starmapRequest('celestial-objects/' + celestialObject.code)
      const entityJson = await buildFromJson(json, parent)
      const entity = await type.process(entityJson, json)
      if (!entity) { continue }
      if (json.children) {
        await processChilds(json.children, entity)
      }
    }
  }

  let starmapSystems = bootup.systems.resultset
  //starmapSystems = [starmapSystems[0]]
  const systems = []
  for (const starmapSystem of starmapSystems) {
    if (starmapSystem.code !== 'STANTON') { continue }
    const { resultset: [json] } = await starmapRequest('star-systems/' + starmapSystem.code)
    const entity = await buildFromJson(json)
    const system = await types.system.process(entity, json)
    systems.push({ system, json })
  }
  console.log('STARTING CELESTIAL OBJECTS')
  for (const { system, json } of systems) {
    await processChilds(json.celestial_objects, system)
  }

}