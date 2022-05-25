module.exports = {
  extends: ['eslint:recommended'],
  env: {
    node: true, // 启动 node 中全局变量
    browser: true, // 启动浏览器中全局变量
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: {
    'no-var': 2, //不能使用 var 定义变量，2：error
  }
}