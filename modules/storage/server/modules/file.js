const { File } = require('storage')
const { join } = require('path')
const { rootName } = require('../utils')
const fs = require('fs').promises

const updatePath = async (file) => {
  await file.folder.load()
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
        await updatePath(file)
        await next()
      },
      async update(req, file, old, next) {
        if(!file.folder.equals(old.folder)){
          await updatePath(file)
        }
        await fs.rename(join(config.root, old.path), join(config.root, file.path))
        await next()
      }
    })
  }
}