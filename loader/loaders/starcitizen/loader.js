

const loader = () => { }

const collectionLoader = async (collectionName, entries, db) => {
  const collection = db.collection(collectionName)
  const results = []
  for (let entry of entries) {
    const result = await collection.findOneAndUpdate({
      'starcitizen.id': entry.starcitizen.id,
    }, {
      $set: entry,
    }, {
      upsert: true,
      returnNewDocument: true,
    })
    if (!result.value) {
      const id = result.lastErrorObject?.upserted

      if (id) {
        entry._id = id
      } else {
        throw new Error()
      }
    } else {
      entry._id = result.value._id
    }
  }
}

module.exports = {
  loader,
  collectionLoader,
}