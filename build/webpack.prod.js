const { merge } = require('webpack-merge')
const webpack = require('webpack')
const webpackCommonConfig = require('./webpack.common')
const { distPath } = require('./paths')

module.exports = merge(webpackCommonConfig, {
  mode: 'production',
  output: {
    filename: 'bundle.[contenthash:8].js',
    path: distPath
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5 * 1024,
            outputPath: 'images'
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('production')
    })
  ]
})
