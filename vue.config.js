const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  productionSourceMap: false,
  transpileDependencies: true,
  lintOnSave: false,
  // runtimeCompiler: true
  devServer: {
    // port: port,
    open: true,
    // overlay: {
    //   warnings: false,
    //   errors: true
    // },
    // 代理跨域的配置
    proxy: {
        // 当我们的本地的请求 有/api的时候，就会代理我们的请求地址向另外一个服务器发出请求
        // 这里的api 表示如果我们的请求地址有/api的时候,就出触发代理机制
        // localhost:8888/api/abc  => 代理给另一个服务器
      '/api': {
        target: 'http://1.117.144.92:8088', // 跨域请求的地址
        changeOrigin: true, // 只有这个值为true的情况下 才表示开启跨域
        secure: false, // 如果是https接口，需要配置这个参数
        // 路径重写
        pathRewrite: {
            // 重新路由  localhost:8888/api/login  => www.baidu.com/api/login
            '^/api': '' // 假设我们想把 localhost:8888/api/login 变成www.baidu.com/login 就需要这么做 
        }
      }
    }
  }


});

// 服务器配置
// 'use strict'
// // Template version: 1.3.1
// // see http://vuejs-templates.github.io/webpack for documentation.
 
// const path = require('path')
 
// module.exports = {
//   dev: {
 
//     // Paths
//     assetsSubDirectory: 'static',
//     assetsPublicPath: '/',
//     proxyTable: {
//       '/': {
//         target: 'http://localhost:8080',
//         changeOrigin: true,
//         pathRewrite: {
//           '^/': ''
//         }
//       },
//       '/ws/*': {
//         target: 'ws://127.0.0.1:8080',
//         ws: true
//       }
//     },
 
//     // Various Dev Server settings
//     host: 'localhost', // can be overwritten by process.env.HOST
//     port: 8082, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
//     autoOpenBrowser: false,
//     errorOverlay: true,
//     notifyOnErrors: true,
//     poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
 
//     // Use Eslint Loader?
//     // If true, your code will be linted during bundling and
//     // linting errors and warnings will be shown in the console.
//     useEslint: true,
//     // If true, eslint errors and warnings will also be shown in the error overlay
//     // in the browser.
//     showEslintErrorsInOverlay: false,
 
//     /**
//      * Source Maps
//      */
 
//     // https://webpack.js.org/configuration/devtool/#development
//     devtool: 'cheap-module-eval-source-map',
 
//     // If you have problems debugging vue-files in devtools,
//     // set this to false - it *may* help
//     // https://vue-loader.vuejs.org/en/options.html#cachebusting
//     cacheBusting: true,
 
//     cssSourceMap: true
//   },
 
//   build: {
//     // Template for index.html
//     index: path.resolve(__dirname, '../dist/index.html'),
 
//     // Paths
//     assetsRoot: path.resolve(__dirname, '../dist'),
//     assetsSubDirectory: 'static',
//     assetsPublicPath: '/',
 
//     /**
//      * Source Maps
//      */
 
//     productionSourceMap: true,
//     // https://webpack.js.org/configuration/devtool/#production
//     devtool: '#source-map',
 
//     // Gzip off by default as many popular static hosts such as
//     // Surge or Netlify already gzip all static assets for you.
//     // Before setting to `true`, make sure to:
//     // npm install --save-dev compression-webpack-plugin
//     productionGzip: false,
//     productionGzipExtensions: ['js', 'css'],
 
//     // Run the build command with an extra argument to
//     // View the bundle analyzer report after build finishes:
//     // `npm run build --report`
//     // Set to `true` or `false` to always turn it on or off
//     bundleAnalyzerReport: process.env.npm_config_report
//   }
// }