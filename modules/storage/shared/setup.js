const managementSetup = require('management/setup')
const Folderable = require('./mixins/Folderable')

managementSetup.user.push(Folderable)