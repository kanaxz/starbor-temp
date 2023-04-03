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
        "/apis/auth": "http://localhost:1234",
        '/assets': "http://localhost:1234",
        '/datas': "http://localhost:1234"
      },
      historyApiFallback: true
    },
    target: ['web', 'es5'],
    output: {
      path: join(root, '.build'),
      filename: '[name].bundle.js',
      crossOriginLoading: false,
    },
    resolve: {
      alias: {
        '@shared': path('../../shared'),
        '@core': path('../src/core'),
        '@app': path('../src'),
      },
    },
    optimization: {
      minimize: false,
    },
  }
}