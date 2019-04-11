'use strict'

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },

  devServer: {
    hot: true
  }
}