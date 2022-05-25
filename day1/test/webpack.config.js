const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  // 入口
  entry: './src/main.js',
  // 输出
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  // 加载器
  module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ]
  },
  // 插件
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, 'src')
    })
  ],
  // 模式
  mode: 'development'
}