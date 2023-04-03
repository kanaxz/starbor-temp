const Router = require('@core/Router')
const pageMiddleware = require('@core/page/middleware')

const rootRouter = new Router()
const appRouter = new Router()

const route = (...args) => {
  appRouter.route(...args)
}

const use = (...args) => {
  appRouter.use(...args)
}

const navigate = async (url, replaceState) => {
  history[replaceState ? "replaceState" : "pushState"]({}, '', url)
  await rootRouter.execute()
}

const start = async ({ presenter }) => {
  rootRouter.use(pageMiddleware(presenter))
  rootRouter.use(appRouter)

  window.addEventListener('popstate', async () => {
    await rootRouter.execute()
  })

  await rootRouter.execute()
}

module.exports = {
  route,
  use,
  navigate,
  start,
}