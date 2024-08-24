const { Organization, Star, System, Entity } = require('starbor/types')
const { starmapRequest, getSystemPosition } = require('./utils')
const { codify } = require('../../utils')
const User = require('sools-auth/User')
const types = require('./types')

module.exports = async (bootup, services) => {
  const systemUser = await User.collection.getMe()
  const uploadFolder = await systemUser.folder.getByPath('/private/upload')
  if (!uploadFolder) {
    throw new Error('Upload folder not found')
  }


  const processors = require('./processors')({ uploadFolder })

  const canParse = (json) => {
    return types.some(([d, c]) => c(json))
  }

  const parse = async (parsedJson, json) => {
    const type = types.find(([d, c]) => c(json))
    if (!type) {
      throw new Error('Type not found')
    }

    const model = type[0].parse(json)
    if (type[2]) {
      type[2](model, json)
    }
    return processAndCreate(model, json)
  }

  const processAndCreate = async (model, json) => {
    for (const [t, p] of processors) {
      if (model.constructor.hasMixin(t)) {
        await p(model, json)
      }
    }
    return Entity.collection.create(model)
  }

  const buildFromJson = async (json, parent) => {
    const name = (json.name || json.designation).split('(')[0].trim()
    const affiliation = json.affiliation[0]
    let organization
    if (affiliation) {
      organization = await Organization.collection.findByUniqueIndex({
        code: codify(affiliation.code),
      })
    }
    let image

    return {
      code: codify(name),
      organization,
      name,
      wiki: json.description || name,
      designation: json.designation,
      description: json.description,
      image,
      parent,
    }
  }

  const processChilds = async (celestialObjects, parent) => {
    let isStar = false
    if (parent instanceof Star) {
      parent = parent.parent
      isStar = true
    }
    for (const celestialObject of celestialObjects) {

      console.log(
        celestialObject.id,
        celestialObject.code,
        celestialObject.name,
        celestialObject.parent_id,
        parent.starmapId,
        parent.name,
      )
      /**/

      if (celestialObject.type !== 'STAR' && celestialObject.parent_id !== parent.starmapId && !isStar) {
        continue
      }

      const typeInfos = types.find(([, c]) => c(celestialObject))
      if (!typeInfos) {

        console.log(celestialObject.type, celestialObject.subtype?.name)
        console.log(JSON.stringify(celestialObject))
        //process.exit()
        /**/
        continue
      }
      const { resultset: [json] } = await starmapRequest('celestial-objects/' + celestialObject.code)
      const entityJson = await buildFromJson(json, parent)
      const [type, n, builder] = typeInfos
      let entity = type.parse(entityJson)
      if (builder) {
        builder(entity, json)
      }
      entity = await processAndCreate(entity, json)
      if (!entity) { continue }
      entity.starmapId = json.id
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
    let system = System.parse(entity)
    system.position = getSystemPosition(json)
    system = await processAndCreate(system, json)
    system.starmapId = json.id
    systems.push({ system, json })

  }

  console.log('STARTING CELESTIAL OBJECTS')
  for (const { system, json } of systems) {
    await processChilds(json.celestial_objects, system)
  }

}