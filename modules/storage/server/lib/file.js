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
      await next()
    }
  })
}
