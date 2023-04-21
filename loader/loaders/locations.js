const { codify } = require('../utils')

module.exports = (services) => {
  const { db } = services
  const collection = db.collection('locations')

  const entries = []

  const save = async (location, upsert = false) => {
    location._id = codify(location.name)

    const result = await collection.findOneAndUpdate(
      {
        _id: location._id,
      },
      {
        $set: location
      },
      {
        upsert,
        returnNewDocument: true,
      })

    if (!result.lastErrorObject?.updatedExisting && !upsert) {
      throw new Error()
    }
    if (!result.value) {
      result.value = {
        _id: result.lastErrorObject.upserted
      }
    }
    Object.assign(location, result.value)
    entries.push(location)
    return location
  }

  services.locations = {
    collection,
    save,
    entries,
  }
}