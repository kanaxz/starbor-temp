const { Folder } = require('storage')
const { join } = require('path')
const fs = require('fs').promises

const updatePath = async (folder) => {
  if (folder.folder) {
    await folder.folder.load()
    folder.path = `${folder.folder.path}/${folder.name}`
  } else {
    folder.path = `/${folder.name}`
  }
}

module.exports = {
  dependancies: ['modeling', 'config'],
  async construct({ modeling, config }) {
    modeling.controller(Folder, {
      async create(req, folder, next) {

        await updatePath(folder)

        Object.assign(folder, {
          size: 0,
        })

        const fullPath = join(config.root, folder.path)
        console.log('creating folder', fullPath)
        await fs.mkdir(fullPath, { recursive: true })

        await next()
      },
    })
  }
}