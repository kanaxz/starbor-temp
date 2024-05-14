const Router = require('hedera/routing/routers/Router')
const Folder = require('storage/Folder')
const { objectToFilter } = require('modeling/processing/utils')

const router = new Router()

router.route(/\/explorer(.+)/, async (req, res) => {
  const [, path] = req.match
  const storageFolder = await Folder.collection.findByUniqueIndex({
    name: 'storage',
    folder: null,
  })
  console.log({ path })
  const folder = await storageFolder.getByPath(path)
  res.page(import('./StoragePage'), folder)
})

module.exports = router