const CopyWebpackPlugin = require('copy-webpack-plugin')
const { join } = require('path')


module.exports = () => {
  return {
     plugins: [
      new CopyWebpackPlugin(
        [
          {
            from: join(__dirname, '../src/index.html'),
            to: 'index.html'
          }
        ]
      )
    ],
    module: {
      rules: [{
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      }]
    }
  }
}
