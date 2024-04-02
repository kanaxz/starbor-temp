const { join } = require('path')

module.exports = (argv) => {

  const path = argv.mode === 'production' ? join(__dirname, '../../server/.dist') : join(__dirname, '../.build')
  console.log({ path }, argv.mode)
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
          target: 'https://localhost:3001',
          secure: false,
        },
      ],
      historyApiFallback: true,
      port: 8081,
      allowedHosts: 'all',
    },
    target: ['web', 'es5'],
    output: {
      path,
      filename: '[name].bundle.js',
      crossOriginLoading: false,
    },
    resolve: {
      alias: {
        '@app': join(__dirname, '../src'),
      },
    },
    optimization: {
      minimize: false,
    },
  }
}