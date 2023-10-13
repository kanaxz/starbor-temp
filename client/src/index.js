// order is important: core-client->modeling/setup->core
require('./setup')
const App = require('./App')
const navigator = require('./navigator')
const pageMiddleware = require('hedera/page/middleware')


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