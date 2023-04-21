const TerserPlugin = require('terser-webpack-plugin')

module.exports = () => {
  return {
    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
      ],
    },
  }
}
