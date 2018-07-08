![](//misc.aotu.io/pfan123/hob/svg.png)
# 通过`svg-sprite-loader`来使用svg

## 1. 何为`svg sprite`
类似于CSS中的雪碧图。将svg整合在一起，呈现的时候根据`symbolId`来显示特定的图标。

## 2. `svg sprite`与`symbol`元素
可以这样简单理解，`symbol`是一个个svg图标，而`svg sprite`则是`symbol`的集合，我们可以通过`use`来指定使用哪一个`svg`。

## 3. 在`vue`中使用
1. 安装`svg-sprite-loader`
执行`npm install --save-dev svg-sprite-loader`

2. 修改`webpack.base.conf.js`
在rules下添加并修改以下配置：
```
{
  test: /\.svg$/,
  loader: 'svg-sprite-loader',
  include: [resolve('src/icons')],
  options: {
    symbolId: '[name]'
  }
},
{
  test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
  loader: 'url-loader',
  exclude: [resolve('src/icons')],
  options: {
    limit: 10000,
    name: utils.assetsPath('img/[name].[hash:7].[ext]')
  }
}
```
配置说明:
- svg-sprite-loader：
  这里用`include: [resolve('src/icons')]`来假设项目中所用到`svg`图标文件在`src/icons`文件目录下，`svg-sprite-loader`将只处理这里的文件

- url-loader:
  这里用`xclude: [resolve('src/icons')]`来告诉`url-loader`不要处理`src/icons`下的图片文件（因为这里已经交给`svg-sprite-loader`了）

3. 添加`icon`组件
在`src/components`文件夹下新建文件夹`icon`，并新建`index.vue`文件，写入内容如下：

```
<template>
  <svg :width="width" :height="height">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
export default {
  name: 'Icon',

  props: {
    type: {
      default: 'sad'
    },

    width: {
      default: 50
    },

    height: {
      default: 50
    }
  },

  computed: {
    iconName() {
      console.log(this.$props.type);
      return '#' + this.$props.type
    }
  }
}
</script>

<style scoped>
svg {
  fill: currentColor;
  overflow: hidden;
}
</style>
```

4. 新建`src/icons`文件夹
假如所有的`svg`文件都放在`src/icons/svg`文件夹下，那么新建`src/icons/index.js`文件，写入：

```
import Vue from 'vue';
import Icon from '@/components/icon';

Vue.component('icon', Icon);

// 导入所有的svg（参照webpack文档: http://webpack.github.io/docs/context.html#dynamic-requires ）
~function (requireContext) {
  return requireContext.keys().map(requireContext)
}(require.context('./svg', false, /\.svg$/))

```

至此，如有不理解，可参照我的`src`目录结构示意：
```
├── App.vue
├── assets
│   └── logo.png
├── components
│   └── icon
│       └── index.vue
├── icons
│   ├── index.js
│   └── svg
│       ├── more.svg
│       ├── navicon.svg
│       ├── pause.svg
│       ├── play.svg
│       ├── sad.svg
│       └── wifi.svg
└── main.js

```

5. 在`main.js`引入`src/icons/index.js`
```
import Vue from 'vue'
import App from './App'

import './icons/index'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
```

6. 如何使用
以我的`App.vue`文件举个例子：

```
<template>
  <div id="app">
    <icon type="play"></icon>
    <icon type="sad"></icon>
    <icon type="more"></icon>
    <icon type="pause"></icon>
    <icon type="wifi"></icon>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

效果预览:
![效果图](http://ownsprds9.bkt.clouddn.com/2017-12-11%2022-02-57%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE.png)