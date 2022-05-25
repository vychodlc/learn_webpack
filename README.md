+ 基本使用
  ```bash
  npm init -y
  npm install webpack webpack-cli -D
  npx webpack ../src/main.js --mode=development
  ```

+ 基本配置
  + 五大核心概念
    + entry 入口
    + output 输出
    + loader 加载器
      + webpack 自身只能处理 js 和 json 文件，其他文件的打包需要安装指定 loader
    + plugin 插件
      + 扩展功能
    + mode 模式
      + development
      + production
  + 配置文件
    + 根目录下 webpack.config.js
      + entry使用相对路径，output使用绝对路径
      + 注意是花括号还是方括号

+ 开发模式介绍
  + 开发代码时使用的模式
  + 在开发模式中需要完成两件事
    + 编译代码，使浏览器能识别运行
    + 代码质量检查，树立代码规范

+ 处理样式资源
  + 包括 css, less, scss, styl 样式资源
  + 处理 css
    + 下载
    ```
    npm i css-loader style-loader -D
    ```
   + use 的顺序使从后向前
  
+ 处理图片资源
  + 为什么要转化为base64编码？
    + 提升性能: 网页上的每一个图片，都是需要消耗一个 http 请求下载而来的, 图片的下载始终都要向服务器发出请求，要是图片的下载不用向服务器发出请求，base64可以随着 HTML 的下载同时下载到本地.减少https请求。
    + 加密: 让用户一眼看不出图片内容 , 只能看到编码。
    + 方便引用: 在多个文件同时使用某些图片时, 可以把图片转为base64格式的文件, 把样式放在全局中, 比如common.css, 以后在用的时候就可以直接加类名, 二不需要多层找文件路径, 会提升效率。
  ```javascript
  {
    test: /\.(png|jpe?g|git|webp|svg)$/,
    type: "asset",
    parser: {
      dataUrlCondition: {
        maxSize: 10 * 1024
      }
    },
    generator: {
      filename: 'static/images/[hash:10][ext][query]'
    }
  }
  ```

+ 修改输出名称目录

+ 自动清空上次打包内容
  + output 里面设置 clear: true

+ 处理字体图标资源
  ```javascript
  {
    test: /\.(ttf|woff2?)$/,
    type: "asset/resource",
    generator: {
      filename: 'static/media/[hash:10][ext][query]'
    }
  }
  ```

+ 处理其他资源
  + 在 media 的 test 中添加如 avi/mp3 等文件拓展名

+ 处理 js 资源
  + 需求分析
    + 针对 js 兼容性处理 --> 使用 bable
    + 针对代码格式 --> 使用 eslint
  + Eslint
    + 配置文件
      + .eslintrc
      + .eslintrc.js （主选）
      + .eslintrc.json
      + package.json 中的 eslintConfig
    + 具体配置(以 .eslintrc.js 为例)
      + 总体
        ```javascript
        module.export = {
          // 解析选项
          parserOption: {},
          // 具体检查规则
          rules: {},
          // 继承其他规则
          extends: [],
          // ...
        }
        ```
      + parserOption 解析选项
        ```javascript
        parserOption: {
          ecmaVersion: 6, // ES 语法版本
          sourceType: 'module', // ES 模块化
          ecmaFeatures: {
            jsx: true // 如果是react 需要开启
          }
        }
        ```
      + rules 具体规则
        + 具体规划
          + off 或 0，关闭规则
          + warn 或 1，开启，警告，不会导致程序退出
          + error 或 2，开启，错误，当被触发的时候程序会退出
        + 样例
        ```javascript
        rules: {
          semi: 'error', // 禁止使用分号
          'array-callback-return': 'warn', // 强制数组方法的回调函数必须有 return 语句，否则报错
          'default-case': [
            'warn', // 要求 switch 语句中有 default 分支，否则报错
            { commentPattern: '^no default$' } // 允许在最后注释 no default，就不会警告
          ],
          eqeqeq: [
            'warn', // 强制使用 === 和 !===，否则警告
            'smart', // 智能选项，某些特殊情况不报错
          ]
        }
        ```
      + extends 继承
        + 继承现有的规则
        + 如果有需要修改的，可以在 rules 中进行修改
        + 样例
          + Eslint 官方规则：`eslint:recommended`
          + Vue-cli 官方规则：`plugin:vue/essential`
    + 在 webpack 中使用
      + 下载
        ```bash
        npm i eslint-webpack-plugin eslint -D
        ```
      + 配置文件 (webpacj.config.js)
        + 引用
          ```javascript
          const ESlintPlugin = require('eslint-webpack-plugin')
          ```
        + 导入
          ```javascript
          module.export = {
            // ...
            plugins: [
              new ESlintPlugin({ // options 配置选项
                context: path.resolve(__dirname, "src") // 指定检查目录
              })
            ],
            // ...
          }
          ```
    + vscode 的 eslint 插件
      + 为了防止插件乱杀
        + 新建 `.eslintignore` 
          ```
          dist
          ```
        + 这样可以确保 dist 内的代码不会被 eslint 检查
