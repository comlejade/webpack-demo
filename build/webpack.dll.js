const path = require('path')
const DllPlugin = require('webpack/lib/DllPlugin')
const { distPath } = require('./paths')

module.exports = {
  mode: 'development',
  entry: {
    // 把 react 相关模块放到一个单独的动态链接库
    react: ['react', 'react-dom']
  },
  output: {
    // 输出动态链接库的文件名
    filename: '[name].dll.js',
    // 输入文件的路径
    path: distPath,
    // 存放动态链接库的全局变量名
    library: '_dll_[name]'
  },
  plugins: [
    // 接入 DllPlugin
    new DllPlugin({
      // 和 output中保持一致
      name: '_dll_[name]',
      // 描述动态链接库的 manifest.json 文件输出时的文件名
      // 对 dll 库的索引
      path: path.join(distPath, '[name].manifest.json')
    })
  ]
}