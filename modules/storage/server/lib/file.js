const { File } = require('storage')
const { join } = require('path')
const fs = require('fs').promises



module.exports = async ({ modeling }, { root }) => {
  modeling.controller(File, {
    async create(req, file, next) {
      if (!req.fromUploadAPI) {
        throw new Error('Cannot create file')
      }
      await next()
    },
    async update(req, file, old, next) {
      if (!file.folder.equals(old.folder)) {
        await updatePath(req, file)
      }
      await fs.rename(join(root, old.path), join(root, file.path))
      await next()
    }
  })
}
