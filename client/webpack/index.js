const plugins = [
  require('./main'),
  require('./sass'),
  require('./javascript'),
  require('./html'),
]

const { merge } = require('webpack-merge')

module.exports = async () => {
  const options = plugins.map((p) => p())
  const webpackOptions = merge(...options)

  console.log(`MERGED WEBPACK CONFIG:\n ${JSON.stringify(webpackOptions, null, 4)}\n`)

  return webpackOptions
}
