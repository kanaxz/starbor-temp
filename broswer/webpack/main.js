const { join } = require('path')

module.exports = (argv) => {

  const path = argv.mode === 'production' ? join(__dirname, '../../server/.dist') : join(__dirname, '../.build')

  return {
    mode: argv.mode || 'development',
    devtool: "source-map",
    watch: true,
    watchOptions: {
      poll: true
    },
    devServer: {
      https: true,
      proxy: [
        {
          context: ['/api', '/store', '/upload'],
          target: 'https://localhost:7001',
          secure: false,
        },
      ],
      historyApiFallback: true,
      port: 9001,
      allowedHosts: 'all',
    },
    target: ['web', 'es5'],
    output: {
      path,
      filename: '[name].bundle.js',
      crossOriginLoading: false,
    },
    optimization: {
      minimize: false,
    },
    entry: {
      main: './index.js',
    },
  }
}