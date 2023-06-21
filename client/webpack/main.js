const { join } = require('path')
const root = join(__dirname, '..')
const path = (p) => join(__dirname, p)

module.exports = () => {
  return {
    mode: 'development',
    devtool: "source-map",
    watch: true,
    watchOptions: {
      poll: true
    },
    devServer: {
      proxy: {
        "/api": "http://localhost:8000",
      },
      historyApiFallback: true,
      port: 8081,
      allowedHosts: 'all',
    },
    target: ['web', 'es5'],
    output: {
      path: join(root, '.build'),
      filename: '[name].bundle.js',
      crossOriginLoading: false,
    },
    resolve: {
      alias: {
        '@app': path('../src'),
      },
    },
    optimization: {
      minimize: false,
    },
  }
}