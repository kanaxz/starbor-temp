
const loaders = [
  require('./labels'),
  require('./map'),
  require('./manufacturers'),
  require('./items'),
  require('./services'),
  /*
  'map',
  'manufacturers',
  'vehicleCareers',
  'vehicleRoles',
  'infractions',
  'items',
  /*
  'ships',
  /*
  'quantumDrives',
  'manufacturers',
  'powerPlants',
  /**/
]

module.exports = async (services) => {
  for (const loader of loaders) {
    await loader(services)
  }
}