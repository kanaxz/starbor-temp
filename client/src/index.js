const navigator = require('./navigator')

require('@core')
require('./auth')
require('./form')
require('./style.scss')
require('./main')

const app = {}
const start = async () => {
  console.log('Starting app')
  const root = document.getElementById("root")
  await root.start(app)
  await navigator.start(app)
}

start()