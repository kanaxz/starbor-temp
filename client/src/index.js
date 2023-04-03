const navigator = require('./navigator')
const pageMiddleware = require('@core/page/middleware')

require('@core')
require('./auth')
require('./form')
require('./style.scss')
require('./main')



const start = async () => {
  console.log('Starting app')
  const app = {}
  const root = document.getElementById("root")
  await root.start(app, { navigator })
  navigator.root.use(pageMiddleware(app.presenter))
  await navigator.start()
}

start()