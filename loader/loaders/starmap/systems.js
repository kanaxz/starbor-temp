const { starmapRequest, createOrUpdateLocation, gePositionFromLatLon } = require('./utils')


module.exports = async (bootup, services) => {
  const { db, locations } = services
  const types = require('./types')(services)

  const buildLocationFromJson = (json, parent) => ({
    starmap: {
      id: json.id,
      position: gePositionFromLatLon(json),
      'orbitPeriod': json.orbit_period,
    },
    affiliation: json.affiliation[0]?.code.toUpperCase(),
    name: (json.name || json.designation).split('(')[0].trim(),
    designation: json.designation,
    description: json.description,
    image: json.thumbnail?.source,
    parent: parent ? {
      _id: parent._id,
    } : null,
    json,
  })

  const processChilds = async (celestialObjects, parent, shouldUseParent) => {
    for (const celestialObject of celestialObjects) {
      if (celestialObject.type !== 'STAR' && celestialObject.parent_id !== parent.starmap.id) { continue }
      const type = Object.values(types).find((type) => type.check(celestialObject))
      if (!type) {
        console.log(celestialObject.type, celestialObject.subtype?.name)
        console.log(JSON.stringify(celestialObject))
        process.exit()
        continue
      }
      const { resultset: [json] } = await starmapRequest('celestial-objects/' + celestialObject.code)
      const location = buildLocationFromJson(json, shouldUseParent ? parent.parent : parent)
      console.log(location.parent._id, parent?._id)
      const childsShouldUseParent = await type.process(location)
      if (json.children) {
        await processChilds(json.children, location, childsShouldUseParent)
      }
    }
  }

  let starmapSystems = bootup.systems.resultset
  //starmapSystems = [starmapSystems[0]]
  const systems = []
  for (const starmapSystem of starmapSystems) {
    const { resultset: [json] } = await starmapRequest('star-systems/' + starmapSystem.code)
    const location = buildLocationFromJson(json)
    await types.system.process(location)
    systems.push(location)
  }
  console.log('STARTING CELESTIAL OBJECTS')
  for (const system of systems) {
    await processChilds(system.json.celestial_objects, system)
  }

}