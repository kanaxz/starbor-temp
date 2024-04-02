const fs = require('fs')
const moment = require('moment')
const { join } = require('path')

module.exports = {
  name: 'migrations',
  dependencies: ['core', 'mongo'],
  construct({ core, mongo }, config) {
    const collection = mongo.db.collection('migrations')

    const migrate = async () => {
      const executedMigrations = await collection.find({}).toArray()
      const migrations = []
      const collectModule = (module) => {
        module.modules.forEach(collectModule)

        const { path } = module.options
        const migrationsPath = join(path, 'migrations')
        if (!fs.existsSync(migrationsPath)) {
          return
        }

        const files = fs.readdirSync(migrationsPath)
        for (const file of files) {
          const filePath = join(migrationsPath, file)
          let date
          if (file === 'setup.js') {
            date = new Date(0, 0, 0)
          } else {
            const [d, m, y] = file.split(/-/g)
            date = moment(`${d}-${m}-${y}`, 'DD-MM-YYYY').toDate()
          }
          migrations.push({ date, migrate: require.main.require(filePath), module, file })
        }
      }
      collectModule(core.module)

      migrations.sort(({ date: a }, { date: b }) => a - b)
      const context = {
        setup: true
      }
      for (const { file, migrate, module } of migrations) {
        if (!executedMigrations.some((m) => m.file === file)) {
          await migrate(context, config, module)
          if (file !== 'setup.js') {
            await collection.insertOne({
              date: new Date(),
              file,
            })
          }
        }

      }
    }

    const purge = async () => {
      await collection.deleteMany({})
    }

    core.on('migrate', migrate)
    core.on('purge', purge)
  }
}