const { File, Folder, Image } = require('storage')
const { join } = require('path')
const { rootName } = require('../utils')
const fs = require('fs').promises

const updatePath = async (file) => {
  await file.parent.load()
  file.path = `${file.parent.path}/${file._id}`
}

module.exports = {
  dependancies: ['modeling'],
  async construct({ modeling, config }) {
    modeling.controller(File, {
      async create(req, file, next) {
        await updatePath(file)
        await next()
      },
      async update(req, file, old, next) {
        if(!file.parent.equals(old.parent)){
          await updatePath(file)
        }
        await fs.rename(join(config.root, old.path), join(config.root, file.path))
        await next()
      }
    })
  }
}