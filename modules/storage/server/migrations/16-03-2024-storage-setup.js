const { processUser } = require('../utils')

module.exports = async (context) => {
  await processUser(context, context.user)
}