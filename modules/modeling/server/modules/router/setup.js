const { handleError } = require('core-server/errors')
const { Model } = require('modeling/types')

module.exports = async ({ modeling, router }) => {
  const { collections } = modeling
  Object.entries(collections)
    .forEach(([collectionName, collection]) => {
      collection.constructor.methods.forEach((methodName) => {
        const route = `/${collectionName}/${methodName}`
        router.post(route, async (req, res) => {
          const args = req.body
          try {
            const start = new Date()
            const result = await collection[methodName](req, ...args)
            res.send({
              result: result?.toJSON()
            })
            //console.log('end', new Date() - start, collectionName, methodName)
          } catch (err) {
            handleError(res, err)
          }
        })
      })
    })
}