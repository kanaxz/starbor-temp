const moment = require('moment')

cron(async (req, collections) => {
  await collections.file.deleteMany(req, [
    {
      $gt: ['$creationDate', moment().add(-1, 'days').toDate()]
    }
  ])
})