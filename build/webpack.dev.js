const { merge } = require('webpack-merge')
const webpack = require('webpack')
const webpackCommonConfig = require('./webpack.common')
const { distPath } = require('./paths')

module.exports = merge(webpackCommonConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']   // postcss-loader 用于增加一些前缀，增强兼容性
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
      },
      {
        test: /\.(scss|sass)/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('development')
    })
  ],
  devServer: {
    port: '8000',
    client: { progress: true }, // 显示打包进度
    static: {
      directory: distPath
    },  // 根目录
    open: true, // 自动打开浏览器
    compress: true,  // 启动 gzip 压缩
    // 设置代理
    proxy: {
      // 将本地 /api1/xxx 代理到 localhost:3000/api/xxx
      '/api1': 'http://localhost:3000',
      // 将本地 /api2/xxx 代理到 localhost:3000/xxx
      '/api2': {
        target: 'http://localhost:3000',
        pathWrite: {
          'api2': ''
        }
      }
    }
  }
})
