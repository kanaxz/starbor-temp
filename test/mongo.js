const start = async () => {
  const mongo = require('mongodb')
  const client = await mongo.MongoClient.connect('mongodb://127.0.0.1:27018/', {
    useUnifiedTopology: true
  })

  const db = client.db('star-citizen-universe')
  const Entities = db.collection('entities')
  /*
  const entities = await Entities.aggregate([
    {
      $match: {
        name: 'NewBabbage'
      }
    },
    {
      $lookup: {
        from: 'entities',
        as: 'parent',
        let: { 'parentId': `$parent._id` },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: [`$_id`, `$$parentId`]
                  }
                ]

              },
            }
          },
          {
            $lookup: {
              from: 'entities',
              as: 'parent',
              let: { 'parentId': `$parent._id` },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $eq: [`$_id`, `$$parentId`]
                    },
                  }
                },
                {
                  $limit: 1,
                }
              ]
            }
          },
          {
            $limit: 1,
          }
        ]
      }
    },
    {
      $addFields: {
        parent: {
          $first: '$parent'
        }
      }
    },
    {
      $limit: 1
    }
  ]).toArray()
  */

  const entities = await Entities.aggregate([
    {
      $match: {
        name: 'NewBabbage',
      }
    }, {
      $graphLookup: {
        from: 'entities',
        as: 'parents',
        startWith: `$parent._id`,
        connectFromField: 'parent._id',
        connectToField: '_id',
      }
    }
  ]).toArray()
  console.log(JSON.stringify(entities, null, ' '))
}
start()

