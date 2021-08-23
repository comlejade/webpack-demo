const { merge } = require('webpack-merge')
const webpack = require('webpack')
const webpackCommonConfig = require('./webpack.common')
const { distPath, srcPatch } = require('./paths')
const path = require('path')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')

module.exports = merge(webpackCommonConfig, {
  mode: 'development',
  // watch: true, // 开启监听，开启之后，webpack-dev-server 会自动刷新浏览器
  // watchOptions: {
  //   ignored: /node_modules/, //需要忽略的文件
  //   aggregateTimeout: 3000, // 监听到变化后等300ms再去执行
  //   poll: 1000  // 默认每隔1000毫秒询问一次
  // },
  entry: {
    // index: [
    //   'webpack-dev-server/client?http://localhost:8000/',
    //   'webpack/hot/dev-server',
    //   path.join(srcPatch, 'index.js')
    // ],
  },
  
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
    }),
    new HotModuleReplacementPlugin(),
    // 告诉webpack 使用哪些动态库链接
    new DllReferencePlugin({
      manifest: path.join(distPath, 'react.manifest.json')
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
    hot: true,
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
