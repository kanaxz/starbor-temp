require('./setup')
require('./routers')
const App = require('./App')
const { auth } = require('./global')
const { navigator } = require('./global')
const { emptyLayoutRouter, mainLayoutRouter } = require('./routers')

const start = async () => {
  console.info('Starting app')
  const app = new App()
  document.body.appendChild(app)

  app.router.use(emptyLayoutRouter)
  app.router.use(mainLayoutRouter)
  app.router.use((req, res)=>{
    res.navigate('/code-30000', true)
  })
  navigator.use(app.router)
  await auth.getMe()
  await app.start()
  await navigator.start()
}

start()