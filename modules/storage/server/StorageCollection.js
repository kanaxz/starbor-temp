const { join } = require("path");
const MongoCollection = require('mongo/MongoCollection')
const fs = require('fs').promises

module.exports = class StorageCollection extends MongoCollection {
  constructor(type, mongo, controllers, config) {
    super(type, mongo, controllers)
    this.config = config
  }
  async move(req, file, folder, values = {}) {
    const { root } = this.config
    await image.load()
    if (file.parent.equals(folder) || file.parent.path === '/storage/upload') {
      const fileId = file.getIndex('id')
      return await this.update(req, fileId, {
        $set: {
          parent: folder,
          ...values
        }
      })
    } else {
      const copy = new file.constructor.parse(file.toJSON())
      delete copy._id
      delete copy.owner
      delete copy.group
      const newPath = '/storage/upload'
      await fs.copyFile(join(root, file.path), join(root, newPath))
      Object.assign(copy, {
        parent: folder,
        path: newPath
      })
      await this.create(req, copy)
      return copy
    }
  }
}