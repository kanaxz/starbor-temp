const { starmapRequest } = require('./utils')
const systemsLoader = require('./systems')

module.exports = async (services) => {
  const bootup = await starmapRequest('bootup')
  //console.log(Object.keys(bootup), bootup.config)
  const { db } = services

  const loadAffiliations = async () => {
    const collection = db.collection('affiliations')
    for (const starmapObject of bootup.affiliations.resultset) {
      const object = {
        '@type': 'affiliation',
        code: starmapObject.code.toUpperCase(),
        name: starmapObject.name,
        color: starmapObject.color,
        starmap: {
          id: starmapObject.id
        }
      }
      await collection.findOneAndUpdate({
        'starmap.id': object.starmap.id,
      }, {
        $set: object,
      }, {
        upsert: true, new: true,
      })
    }
  }

  const loadSpecies = async () => {
    const collection = db.collection('species')
    for (const starmapSpecies of bootup.species.resultset) {
      const species = {
        '@type': 'species',
        name: starmapSpecies.name,
        starmap: {
          id: starmapSpecies.id
        }
      }
      await collection.findOneAndUpdate({
        'starmap.id': species.starmap.id,
      }, {
        $set: species,
      }, {
        upsert: true, new: true,
      })
    }
  }


  await loadAffiliations()
  await loadSpecies()
  await systemsLoader(bootup, services)
}