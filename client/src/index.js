// order is important: core-client->modeling/setup->core
require('core-client')
require('./modeling/setup')
require('core')
const navigator = require('./navigator')
const pageMiddleware = require('hedera/page/middleware')
const notifications = require('./notifications')
require('hedera')
require('./modeling')
require('./notifications/List')
require('./auth')
require('./fields')
require('./gameEntities')
require('./main')
require('./paneling')
require('./organization')
require('./entitiesList')

require('./style.scss')
require('./api')


const config = require('./config')

console.log({ config })

const start = async () => {
  console.log('Starting app')
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