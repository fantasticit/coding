![](http://img.aotu.io/mihanX/jcloud-opt/banner3.png)

::before和::after伪元素在CSS中可以被用来添加元素、加小标、清浮动等。

<!-- more  -->

# 1 基本语法
在 CSS3 中为了区别伪元素和伪类，伪元素使用了双冒号，因此如果使用了 display 或者 width 等属性时使得显示脱离了原本元素后，建议按照标准双
写。

```
p::before {}
p::after {}
```

这两个伪类下特有的属性 content ，用于在 CSS 渲染中向元素逻辑上的头部或尾部添加内容。注意这些添加不会改变文档内容，不会出现在 DOM 中，不可复制，仅仅是在 CSS 渲染层加入。比较有用的是以下几个值：

## 1.1 String
 使用引号包括一段字符串，将会向元素内容中添加字符串。示例：

```
<p>大写字母</p>

p::after { content: "A"; }
```

图示：

![string](http://img.blog.csdn.net/20170428101847312?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2l0aHViXzM2NzA0MTU4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


## 1.2 attr()
调用当前元素的属性，可以方便的比如将图片的 Alt 提示文字或者链接的 href 地址显示出来。示例：

```
<a href="www.baidu.com">百度</a>

a::after { content: "(" attr(href) ")"; }
```

图示：

![attr](http://img.blog.csdn.net/20170428102143296?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2l0aHViXzM2NzA0MTU4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 1.3 url()
用于引用媒体文件并使图标和文本居中对齐。示例：

```
<div>
    <span>好累</span>
</div>


div {
        font-size: 26px;
}

div::before{
    content: "";
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-right: 2px;
    vertical-align: middle;
    background: url('emoji.png') no-repeat center;
    background-size: 100%;
}

span {
    vertical-align: middle;
```

图示：

![url](http://img.blog.csdn.net/20170428102332516?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2l0aHViXzM2NzA0MTU4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)



## 1.4 counter()
调用计数器，可以不使用列表元素实现序号功能。具体请参见 counter-increment 和 counter-reset 属性的用法。示例：

```
<ul>
    <li>小红</li>
    <li>小米</li>
    <li>小军</li>
    <li>小王</li>
</ul>


ul li {
    list-style: none;
    counter-increment: number;
}

ul li::before {
    content: counter(number)".";
    font-weight: bold;
}
```

图示：

![counter](http://img.blog.csdn.net/20170428102441787?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2l0aHViXzM2NzA0MTU4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

# 2 其他技巧
如果伪元素不需要内容仅配合样式属性做出效果，内容属性也不能为空，即 content:”" 。否则，其他的样式属性一概不会生效。

```
<a href="www.baidu.com">百度</a>



a {
    position: relative;
    left: 50px;
    display: inline-block;
    outline: none;
    text-decoration: none;
    color: #999;
    font-size: 20px;
    padding: 5px 10px;
}

a:hover::before,
a:hover::after {
    position: absolute;
}

a:hover::before {
    content: "[";
    left: -20px;
}

a:hover::after {
    content: "]";
    right: -20px;
}
```


图示：

![百度](http://img.blog.csdn.net/20170428103145908?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2l0aHViXzM2NzA0MTU4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

鼠标移入
![百度](http://img.blog.csdn.net/20170428103211598?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvZ2l0aHViXzM2NzA0MTU4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
