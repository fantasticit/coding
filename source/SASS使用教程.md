![](http://op2clp53n.bkt.clouddn.com/shot_1x.png)

 SASS是一种CSS的开发工具，提供了许多便利的写法，大大节省了设计者的时间，使得CSS的开发，变得简单和可维护。
<!-- more  -->
# 1 安装和使用
使用SASS必须先安装[Ruby](https://rubyinstaller.org/downloads/)，然后再安装**SASS**。
## 1.1 Windows下安装
第一步，下载安装**rubyinstaller**，记得勾选**加入到环境变量**。安装完成后，打开命令窗口输入`ruby -v`，如果看到相应版本信息，则安装成功；如果没有，加入环境变量再试试。<br>
第二步，打开命令窗口输入

```
gem install sass
```

如果报错（国内安装会出现这种情况），那么换源。
首先，输入

```
gem source -a http://gems.ruby-china.org
```

然后，输入

```
gem install sass
```

最后，如果你未来在项目用一些特殊字符 可能会出现 错误所以打开
```
C:\Ruby23-x64\lib\ruby\gems\2.3.0\gems\sass-3.4.22\lib\sass`，打开`engine.rb`在所有require后添加
`Encoding.default_external = Encoding.find('utf-8');
```
问题就解决了。

## 1.2 使用
SASS文件的后缀名是`.scss`。
- 在命令窗口显示.scss文件转换后的css代码。
```
sass first.scss
```
- 将转换后的CSS代码保存到.css文件。
```
sass first.scss first.css
```
- SASS提供4个编译选项：
```
nested：嵌套缩进的css代码，它是默认值。
expanded：没有缩进的、扩展的css代码。
compact：简洁格式的css代码。
compressed：压缩后的css代码。
```
# 2 SASS基本语法
## 2.1 变量
所有变量以$开头。

```
$blue : #696969;

span {
    color : $blue;
}
```

如果变量处在字符串之间，就必须写在#{}之中。

```
$side : left;

div {
    border-#{$side}-radius: 5px;
}
```

## 2.2 表达式
SASS支持在代码中使用算式：

```
div {
    margin: (10px / 2);
    padding-top: 10px + 12px;
    margin-right: $var * 20%;
}
```

## 2.3 嵌套
- 选择器嵌套：
```
div {
    span {
        color: black;
    }
}
```
等价于CSS中：

```
div span {
    color: black;
}
```
- 属性嵌套：
```
div {
    boder: {
        color: red;
    }
}
```
其实就是border-color属性。注意，border后必须加上冒号。
- 引用父元素：
在嵌套的代码内可以使用&引用父元素。比如a:hover伪类可以写成：
```
a {
    &:hover {
        color: red;
    }
}
```
## 2.4 注释
支持两种注释：
- 标准的CSS注释 `/* text */`，会保留到编译后的文件中。
- 单行注释 `// text` ，只保留在sass源文件中，编译后省略。
另外，在/*后加一个感叹号的话，即使是压缩模式编译，也会保留这行注释。
```
/*！
    保留我！
*/
```
# 3 代码重用
## 3.1 继承
可以让一个选择器继承另一个选择器。例如：

```
.class1 {
    color: red;
}
```

class2可以这样继承class1，使用@extend：

```
.class2 {
    @extend .class1;
    font-size: 20px;
}
```

## 3.2 Mixin
使用@mixin可以定义一个可重用的代码块。例如：

```
@mixin left {
    float: left;
    margin-left: 20px;
}
```

使用@include调用这个mixin：

```
div {
    @include left;
}
```

mixin可以指定参数和默认值：

```
@mixin left($value : 10px) {
    float: left;
    margin-left: $value;
}
```

然后这样使用它：

```
div {
    @include left(20px);
}
```

## 3.3 颜色函数
SASS提供了一些颜色函数，以便生成系列颜色。
```
lighten(#cc3, 10%) // #d6d65c
darken(#cc3, 10%) // #a3a329
grayscale(#cc3) // #808080
complement(#cc3) // #33c
```

## 3.4 导入文件
@import，用来导入外部文件：

```
@import "second.scss";
```

如果导入的是css文件，则等价于CSS的import。
```
import "second.css";
```

# 4 其他用法
## 4.1 条件语句
@if 和 @else可以用来判断：

```
@if darken($color) > 20% {
    background-color: #fff;
} @else {
    background-color: #000;
}
```

## 4.2 循环语句
for循环：

```
@for $idx from 1 to 5 {
    .border-#{$idx} {
        border: #{$idx}px solid red;
    }
}
```

while循环：

```
$i : 5;

@while $i > 0 {
    .border-#{$i} {
        width: $i * 200px;
    }

    $i: $i - 1;
}
```

each：

```
@each $member in a,b,c,d {
    .#{$member} {
        background-image: url("/image/#{$member}.jpg");
    }
}
```

## 4.3 自定义函数
创建自定义的函数：

```
@function double($n) {
    @return $n * 2;
}

#sidebar {
    width: double(20px);
}
```

# 5 结束语
**本文极大部分参考了[阮一峰的SASS教程](http://www.ruanyifeng.com/blog/2012/06/sass.html)，感谢开源的互联网精神。**
