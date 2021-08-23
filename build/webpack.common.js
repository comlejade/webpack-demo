const path = require('path')
const { srcPatch } = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')

const webpackCommonConfig = {
  entry: {
    index: path.join(srcPatch, 'index.js'),
    other: path.join(srcPatch, 'other.js')
    // path.join(srcPatch, 'index.js')
  },
  module: {
    rules: [
      {
        test:  /\.js$/,
        use: 'happypack/loader',
        // use: {
        //   loader: 'babel-loader',
        //   options: {
        //     presets: ['@babel/preset-env'],
        //     cacheDirectory: true  // 开启缓存
        //   }
        // },
        // use: ['babel-loader?cacheDirectory'],
        exclude: /node_modules/  // 明确范围
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(srcPatch, 'index.html'),
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'other.html',
      template: path.join(srcPatch, 'other.html'),
      chunks: ['other']
    }),
    new HappyPack({
      loaders: ['babel-loader?cacheDirectory']
    })
  ]
}



module.exports = webpackCommonConfig