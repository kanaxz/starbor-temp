const ignores = [
  // CIG tags
  "pu",
  "ai",
  "civ",
  "qig",
  "crim",
  "pir",
  "template",
  "wreck",
  "piano",
  "swarm",
  "nointerior",
  "s42",
  "hijacked",
  "comms",
  "outlaw",
  "outlaws",
  "uee",
  "tow",
  "shields",
  "mlhm1",
  "microtech",
  "shubin",
  "drug",
  "advocacy",
  "derelict",
  "drone",
  "eaobjectivedestructable",

  // Skin variants
  "pink",
  "yellow",
  "emerald",
  "dunestalker",
  "snowblind",
  "shipshowdown",
  "showdown",
  "citizencon2018",
  "citizencon",
  "pirate",
  "talus",
  "carbon",
  "bis2950",
  "fleetweek"
]

const config = require('../../../config')
const glob = require('glob')
const { join, basename } = require('path')
const parser = require('xml2json')
const fs = require('fs')
const { collectionLoader } = require('../loader')
const { parseBool, getFileRoot } = require('../utils')

const path = join(config.dataPath, 'Libs/Foundry/Records/entities/spaceships')

module.exports = async (services) => {
  const { labels, manufacturers, items, db } = services
  let files = [
    ...await glob(join(path, '**/*'))
  ]

  const extractVehicleComponentsParams = (json) => {
    const params = json.Components.VehicleComponentParams
    const result = {
      name: labels.get(params.vehicleName),
      career: labels.get(params.vehicleCareer),
      role: labels.get(params.vehicleRole),
      crewSize: parseInt(params.crewSize),
      isGravlev: parseBool(params.isGravlevVehicle)
    }
    const manufacturer = manufacturers.entries.find((m) => m._id === params.manufacturer)
    if (manufacturer) {
      Object.assign(result, {
        manufacturer: manufacturer.code
      })
    }
    return result
  }


  const extractLoadout = (json) => {
    const params = json.Components.SEntityComponentDefaultLoadoutParams.loadout.SItemPortLoadoutManualParams.entries.SItemPortLoadoutEntryParams

    return params.map((hardpoint) => {
      const item = items.find((i) => i.starcitizen.className === hardpoint.entityClassName)
      if (!item) { return null }
      let [, ...name] = hardpoint.itemPortName.split('_')
      name = name.join(' ')
      return {
        type: item['@type'],
        defaultItem: item._id,
        name,
      }
    }).filter((o) => o)

  }

  const extractInsurance = (json) => {
    const params = json.StaticEntityClassData.SEntityInsuranceProperties.shipInsuranceParams
    return {
      baseWait: parseFloat(params.baseWaitTimeMinutes),
      mandatoryWay: parseFloat(params.mandatoryWaitTimeMinutes),
      baseExpeditingFee: parseFloat(params.baseExpeditingFee)
    }
  }

  files = files.filter((file) => {
    const fullName = basename(file)
    const [name] = fullName.split('.')
    return !name.split('_').find((segment) => ignores.includes(segment))
  })

  //files = [files[0]]
  const entries = files.map((file) => {
    const [className, json] = getFileRoot(file)
    const vehicleComponentsParams = extractVehicleComponentsParams(json)

    return {
      '@type': 'ship',
      starcitizen: {
        id: json.__ref,
        description: labels.get(json.Components.VehicleComponentParams.vehicleDescription),
        className,
      },
      ...vehicleComponentsParams,
      insurance: extractInsurance(json),
      slots: extractLoadout(json)
    }
  })

  await collectionLoader('items', entries, db)
  items.push(...entries)
}