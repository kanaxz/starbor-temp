const CopyWebpackPlugin = require('copy-webpack-plugin')
const { join } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = () => {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        favicon: './src/assets/favicon.ico',
      }),
      /*
        new CopyWebpackPlugin(
          [
            {
              from: join(__dirname, '../src/index.html'),
              to: 'index.html'
            }
          ]
        )
        /**/
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
