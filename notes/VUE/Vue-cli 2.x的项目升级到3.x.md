# vue-cli 2.x的项目升级到3.x

## 步骤

### 一、卸载与安装

```javascript
//卸载vue-cli2
npm uninstall vue-cli -g
//安装vue-cli3
npm install -g @vue/cli
```

### 二、新建项目

#### 步骤

##### 1、执行代码，新建项目：

```javascript
vue create xxx
```

##### 2、接下来会选择

![img](https://upload-images.jianshu.io/upload_images/18030682-1910adbe16de168b.png?imageMogr2/auto-orient/strip|imageView2/2/w/453/format/webp)

##### 3、选择`Manually select features`，自己手动配置，回车安装插件

![img](https://upload-images.jianshu.io/upload_images/18030682-6157fb7f9614d32b.png?imageMogr2/auto-orient/strip|imageView2/2/w/484/format/webp)

##### 4、进行选择，回车，接下来根据自己的需求来选择

![img](https://upload-images.jianshu.io/upload_images/18030682-5918f4e40059dd85.png?imageMogr2/auto-orient/strip|imageView2/2/w/545/format/webp)

##### 5、回车，项目就创建好了。

##### 6、然后，把 src 直接复制过来替换。

#### 在现有的项目中安装插件

每个 CLI 插件都会包含一个 (用来创建文件的) 生成器和一个 (用来调整 `webpack` 核心配置和注入命令的) 运行时插件。当你使用 `vue create` 来创建一个新项目的时候，有些插件会根据你选择的特性被预安装好。如果你想在一个已经被创建好的项目中安装一个插件，

##### 1、可以使用` vue add` 命令：

```javascript
vue add element
vue add i18n
vue add rx
```

##### 2、安装好之后，在根目录下添加vue.config.js,我的配置如下：

```javascript
const path = require('path')
function resolve (dir) {
    return path.join(__dirname,dir)
}

module.exports = {
    //开发服务配置
    devServer: {
    port: 8888, // 端口号
    // host: 'localhost',  // 主机
    https: false,  // 是否启用https
    open: false // 配置是否自动启动浏览器
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import "~@/assets/scss/custom-theme-var.scss";`//添加全局sass文件
            }
        }
    },
    chainWebpack: (config) => {
        // 链式配置
       
    },
    pluginOptions: {
      i18n: {
        locale: 'zh-TW',
        localeCn: 'zh-CN',
        fallbackLocale: 'en-US',
        localeDir: 'assets/locales',
        enableInSFC: false
      }
    },
    lintOnSave : true
}
```

##### 3、tslint 规则配置,tslint.json

```javascript
{
  "defaultSeverity": "warning",
  "extends": [
    "tslint:recommended"
  ],
  "linterOptions": {
    "exclude": [
      "node_modules/**"
    ]
  },
  "rules": {
    "quotemark": false, // 字符串文字需要单引号或双引号。
    "indent": false, // 使用制表符或空格强制缩进。
    "member-access": false, // 需要类成员的显式可见性声明。
    "interface-name": false, // 接口名要求大写开头
    "ordered-imports": false, // 要求将import语句按字母顺序排列并进行分组。
    "object-literal-sort-keys": false, // 检查对象文字中键的排序。
    "no-consecutive-blank-lines": false, // 不允许连续出现一个或多个空行。
    "no-shadowed-variable": false, // 不允许隐藏变量声明。
    "no-trailing-whitespace": false, // 不允许在行尾添加尾随空格。
    "semicolon": false, // 是否分号结尾
    "trailing-comma": false, // 是否强象添加逗号
    "eofline": false, // 是否末尾另起一行
    "prefer-conditional-expression": false, // for (... in ...)语句必须用if语句过滤
    "curly": true, //for if do while 要有括号
    "forin": false, //用for in 必须用if进行过滤
    "import-blacklist": true, //允许使用import require导入具体的模块
    "no-arg": true, //不允许使用 argument.callee
    "no-bitwise": true, //不允许使用按位运算符
    "no-console": false, //不能使用console
    "no-construct": true, //不允许使用 String/Number/Boolean的构造函数
    "no-debugger": true, //不允许使用debugger
    "no-duplicate-super": true, //构造函数两次用super会发出警告
    "no-empty": true, //不允许空的块
    "no-eval": true, //不允许使用eval
    "no-floating-promises": false, //必须正确处理promise的返回函数
    "no-for-in-array": false, //不允许使用for in 遍历数组
    "no-implicit-dependencies": false, //不允许在项目的package.json中导入未列为依赖项的模块
    "no-inferred-empty-object-type": false, //不允许在函数和构造函数中使用{}的类型推断
    "no-invalid-template-strings": true, //警告在非模板字符中使用${
    "no-invalid-this": true, //不允许在非class中使用 this关键字
    "no-misused-new": true, //禁止定义构造函数或new class
    "no-null-keyword": false, //不允许使用null关键字
    "no-object-literal-type-assertion": false, //禁止object出现在类型断言表达式中
    "no-return-await": true, //不允许return await
    "arrow-parens": false, //箭头函数定义的参数需要括号
    "adjacent-overload-signatures": false, //  Enforces function overloads to be consecutive.
    "ban-comma-operator": true, //禁止逗号运算符。
    "no-any": false, //不需使用any类型
    "no-empty-interface": true, //禁止空接口 {}
    "no-internal-module": true, //不允许内部模块
    "no-magic-numbers": false, //不允许在变量赋值之外使用常量数值。当没有指定允许值列表时，默认允许-1,0和1
    "no-namespace": [true, "allpw-declarations"], //不允许使用内部modules和命名空间
    "no-non-null-assertion": true, //不允许使用!后缀操作符的非空断言。
    "no-parameter-reassignment": true, //不允许重新分配参数
    "no-reference": true, // 禁止使用/// <reference path=> 导入 ，使用import代替
    "no-unnecessary-type-assertion": false, //如果类型断言没有改变表达式的类型就发出警告
    "no-var-requires": false, //不允许使用var module = require("module"),用 import foo = require('foo')导入
    "prefer-for-of": true, //建议使用for(..of)
    "promise-function-async": false, //要求异步函数返回promise
    "max-classes-per-file": [true, 2], // 一个脚本最多几个申明类
    "variable-name": false,
    "prefer-const": false, // 提示可以用const的地方
    "whitespace":false,
    "comment-format":false,
    "align":false,
    "max-line-length":[true, 200]
  }
}
```
