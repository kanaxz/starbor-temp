module.exports = () => {
  return {
    module: {
      rules: [{
        test: /\.scss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'sass-loader',
          options: {
            //additionalData: '@import "starbor-hedera/global.scss";',
          },
        }]
      }]
    }
  }
}