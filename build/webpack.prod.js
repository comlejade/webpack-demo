const { merge } = require('webpack-merge')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const webpackCommonConfig = require('./webpack.common')
const { distPath } = require('./paths')
const TerserPlugin = require('terser-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module.exports = merge(webpackCommonConfig, {
  mode: 'production',
  output: {
    filename: '[name].[contenthash:8].js',
    path: distPath,
    clean: true
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
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader', 'postcss-loader']
      },
      {
        test: /\.(scss|sass)/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader', 'postcss-loader']
      }
      // {
      //   test: /\.css$/i,
      //   use: [MiniCssExtractPlugin.loader, 'css-loader']
      // }
    ],
    noParse: [/jquery\.min\.js$/]
  },
  plugins: [
    new webpack.DefinePlugin({
      ENV: JSON.stringify('production')
    }),
    new MiniCssExtractPlugin({
      filename: '/css/[name].[contenthash:8].css'
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /\.\/locale/, 
      contextRegExp: /moment/
    }),
    // 压缩并输出 js 代码
    new ParallelUglifyPlugin({
      uglifyJS: {
        output: {
          beautify: false,  // 最紧凑的输出
          comments: false   // 删除所有的注释
        },
        compress: {
          // 删除所有的 console 语句
          drop_console: true,
          // 内嵌定义了但是只用到一次的变量
          collapse_vars: true,
          // 提取出现多次但是没有定义成变量去引用的静态值
          reduce_vars: true
        }
      }
    })
  ],
  optimization: {
    // 代码压缩
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],

    // 代码分割
    // splitChunks: {
    //   /**
    //    * initial 入口 chunk，对于异步导入的文件不处理
    //    * async 异步 chunk, 只对异步导入的文件处理
    //    * all 全部 chunk
    //    */
    //   chunks: 'all',
    //   // 缓存分组
    //   cacheGroups: {
    //     // 第三方模块
    //     vendor: {
    //       name: 'vendor', // 模块名称
    //       priority: 1,  // 权限越高，优先抽离，重要！！
    //       test: /node_modules/, // 命中模块的位置，一般第三方模块都放在node_modules中
    //       minSize: 0, // 大小限制
    //       minChunks: 1  // 最少复用过几次
    //     },
    //     // 公公模块模块
    //     common: {
    //       name: 'common', // chunk名称
    //       priority: 0,  // 优先级
    //       minSize: 0, // 公共模块的大小限制
    //       minChunks: 2  // 公共模块最少复用过几次
    //     }
    //   }
    // }
  }
})
