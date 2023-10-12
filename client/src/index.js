// order is important: core-client->modeling/setup->core
require('core/setup')
require('modeling-client/setup')
require('hedera/setup')
require('processing')
require('./services')
const App = require('./App')
const navigator = require('./navigator')
const pageMiddleware = require('hedera/page/middleware')
require('./notifications')
require('hedera')
require('./modal')
require('modeling-client')
require('./notifications/List')
require('./auth')
require('storage-client')
require('../../modules/modeling/client/fields')
require('./gameEntities')
require('./main')
require('./organization')
require('./style.scss')
require('./api')

const start = async () => {
  console.info('Starting app')
  const app = new App()
  document.body.appendChild(app)
  app.start({
    navigator
  })
  
  navigator.root.use(pageMiddleware(app.presenter))
  await navigator.start()
}

start()