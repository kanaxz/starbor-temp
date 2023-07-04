// order is important: core-client->modeling/setup->core
require('core/setup')
require('core-client/setup')
require('./modeling/setup')
const navigator = require('./navigator')
const pageMiddleware = require('hedera/page/middleware')
require('./notifications')
require('hedera')
require('./modeling')
require('./notifications/List')
require('./auth')
require('./fields')
require('./gameEntities')
require('./main')
require('./paneling')
require('./organization')

require('./style.scss')
require('./api')

const start = async () => {
  console.info('Starting app')
  const app = {}
  const root = document.getElementById("root")
  await root.start(app, {
    navigator,
    objects: [{
      objects: [1, 2, 3]
    }, {
      objects: ['a', 'b', 'c']
    }]
  })

  /*
  notifications.notify({
    type: 'info',
    message: 'test'
  })
  /**/

  navigator.root.use(pageMiddleware(app.presenter))
  await navigator.start()
  /**/
}

start()