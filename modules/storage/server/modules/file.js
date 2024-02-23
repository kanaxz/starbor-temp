const { File } = require('storage')
const { join } = require('path')
const { rootName } = require('../utils')
const fs = require('fs').promises

const updatePath = async (req, file) => {
  await file.folder.load(req)
  file.path = `${file.folder.path}/${file._id}`
}

module.exports = {
  dependancies: ['modeling','config'],
  async construct({ modeling, config }) {
    modeling.controller(File, {
      async create(req, file, next) {
        if(!req.fromUploadAPI){
          throw new Error('Cannot create file')
        }
        await updatePath(req, file)
        await next()
      },
      async update(req, file, old, next) {
        if(!file.folder.equals(old.folder)){
          await updatePath(req, file)
        }
        await fs.rename(join(config.root, old.path), join(config.root, file.path))
        await next()
      }
    })
  }
}