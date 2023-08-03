require('core-client/setup')
const loadersNames = [
  require('./loaders/collections'),
  require('./loaders/starmap')
]

const start = async () => {
  const services = {}
  for (const loader of loadersNames) {
    await loader(services)
  }
  console.log('-------- LOADING FINISHED --------')
}

start()