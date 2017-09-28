<template>
    <!---默认语言：html。每个 .vue 文件最多包含一个 <template> 块  .内容将被提取为字符串，将编译并用作 Vue 组件的 template 选项。---->
    <div class="example">{{ msg}}</div>
</template>

<script>
    /**

     默认语言：js (在检测到 babel-loader 或 buble-loader 配置时自动支持ES2015).
     每个 .vue 文件最多包含一个 <script> 块
     该脚本在类 CommonJS 环境中执行（就像通过 Webpack 打包的正常 js 模块），这意味这你可以 require() 其它依赖。在 ES2015 支持下，你也可以使用 import 和 export 语法。
     脚本必须导出 Vue.js 组件对象。也可以导出由 Vue.extend() 创建的扩展对象，但是普通对象是更好的选择
     */
    export default{   //module.exports 出一个 Vue.js 组件对象
        data(){
            return{
                msg:'hello msg!'
            }
        }
    }
</script>


<style lang="">
    /*默认语言： css。 一个 .vue 文件可以包含多个 <style> 标签。

      <style> 标签可以有 scoped 或者 module 属性 (查看 CSS 作用域 和 CSS 模块) 以帮助你将样式封装到当前组件。具有不同封装模式的多个 <style> 标签可以在同一个组件中混合使用。

       默认情况下，将会使用 style-loader 提取内容，并通过 <style> 标签动态加入文档的 <head> 中，也可以配置 Webpack 将所有 styles 提取到单个 CSS 文件中.*/
    .example{
        color:red;
    }
</style>