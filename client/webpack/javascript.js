const TerserPlugin = require('terser-webpack-plugin')

module.exports = () => {
  return {
    /*
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          extractComments: false,
          terserOptions: {
            output: {
              comments: /@build/i,
            },
            sourceMap: true,
          },
        }),
      ],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    }
    /**/
  }
}
