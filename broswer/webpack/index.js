const plugins = [
  require('./main'),
  require('./sass'),
  require('./javascript'),
  require('./html'),
  require('./assets'),
]

const { merge } = require('webpack-merge')

module.exports = async (nope, argv, config) => {
  const options = plugins.map((p) => p(argv))
  const webpackOptions = merge(...options)

  console.log(`MERGED WEBPACK CONFIG:\n ${JSON.stringify(webpackOptions, null, 4)}\n`)

  return webpackOptions
}
