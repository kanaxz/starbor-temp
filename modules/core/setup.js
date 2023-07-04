
const Base = require('./Base')
const mixer = require('./mixer')

mixer.Base = Base

const core = {
  modeling: {
    model: {
      before: [],
      after: []

    },
    arrayAssociation: {
      before: [],
      after: [],
    }
  }
}

module.exports = core