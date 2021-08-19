const path = require('path')
const { srcPatch } = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const webpackCommonConfig = {
  entry: path.join(srcPatch, 'index.js'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(scss|sass)/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(srcPatch, 'index.html')
    })
  ]
}



module.exports = webpackCommonConfig