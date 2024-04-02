const { StorageObject } = require('storage')

module.exports = async ({ modeling }) => {
  modeling.controller(StorageObject, {
    async create(req, storageObject, next) {
      return next()
    },
    async update(req, storageObject, old, next) {
      return next()
    },
    async query(req, stages, { property } = {}) {

      if (await req.user?.is(req, 'admin') || property === StorageObject.properties.find((p) => p.name === 'branch')) {
        return stages
      }

      let filter = false
      if (req.user) {

        const ressourceOwners = await req.user.getRessourcesOwners(req)


        const ids = ressourceOwners.map((ro) => ro._id)
        filter = {
          $if: [
            { $eq: ['$current.read.type', 'private'] },
            {
              $some: ['$current.read.owners', [['owner'], [
                { $in: ['$owner._id', ids] }
              ]]]
            },
            false
          ]
        }
      }

      return [
        ...stages,
        {
          let: {
            current: {
              $if: [
                { $neq: ['$read.type', 'inherited'] },
                '$this',
                {
                  $find: ['$branch', [['parent'], [
                    {
                      $neq: ['$parent.read.type', 'inherited']
                    }
                  ]]]
                }
              ]
            }
          }
        },
        {
          filter: [{
            $if: [
              { $eq: ['$current.read.type', 'public'] },
              true,
              filter
            ]
          }]
        },
      ]
    },
    async create(req, object, next) {
      await next()
    },
  })
}
