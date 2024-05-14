const File = require('storage/File')
const Folderable = require('storage/mixins/Folderable')
const { extname } = require('path')
const Right = require('ressourcing/Right')

module.exports = async ({ modeling }) => {
  modeling.controller(Folderable, {
    async create(context, model, next) {
      const properties = model.constructor.properties.filter((p) => p.type.prototype instanceof File || p.type === File)
      for (const property of properties) {
        const file = model[property.name]
        if (!file) { continue }

        await file.load(context)
        model[property.name] = await File.collection.move(context, file, model.folder, {
          name: `${property.name}${extname(file.name)}`,
          read: new Right({
            type: 'inherited'
          }),
          edit: new Right({
            type: 'inherited'
          })
        })
      }
      await next()
    },
  })
}