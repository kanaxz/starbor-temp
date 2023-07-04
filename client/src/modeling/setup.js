const setup = require('core/setup')
const Controlleable = require('./Controlleable')
setup.modeling.model.before.push(Controlleable)
