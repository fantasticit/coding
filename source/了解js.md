![js](http://misc.aotu.io/o2/img/books/books-cover.jpg)

在学习Node.js之前先回顾一下JavaScript,看一下这门语言所提供的数据类型。

# 1 数据类型
##  1.1 类型基础
Node.js的核心类型有：number（数字）、boolean（布尔值）、string（字符串）以及object（对象）。function（函数）和数组（array）实际上是object的特殊形式。null和undefined也是object的特殊形式，在JavaScript中有特殊作用。

undefined值代表还没有赋值或者不存在。null的意思就是“没有值”。我们可以使用typeof操作符查看任何数据的类型。

## 1.2 常量
虽然Node.js理论上支持const关键字，但是在JavaScript中const并没有被广泛使用。对于常量，还是使用大写字母和变量声明（var）。

## 1.3 number
JavaScript中所有数字都采用64位双精度浮点数表示。
当对浮点数进行算术运算时，仅仅操作任意的实际数字并不一定能得到准确值。例如：
```
    > 1 - 0.2 + 0.1 == 0.9
    false
    >
```
正无穷大（Infinity）和负无穷大（-Infinity）在JavaScript中是合法的值，可用于比较。
isNaN函数可用于验证传入的参数是否位number类型。
isFinite函数可以测试一个给定的值是否是一个合法的有限数（不是Infinite、-Infinite或者NaN）。

## 1.4 boolean
JavaScript会在需要时自动将任何值转换为布尔值，转换规则如下：
1）false、0、空字符串（""）、NaN、null和undefined都等价于false。
2）其他赋值等价于true。

## 1.5 string
要将两个字符串组合在一起，可以使用+操作符：
 ```
    > "cats" + "go";
    cats go
    >
```
如果将其他类型的数据混入到字符串中，JavaScript将尽可能将其他数据转换成字符串：
```
    > var year = 2017;
    >  "This year is " + year + "!";
    This year is 2017!
    >
```
但是也有可能发生这样的情况：
```
    > 5 + 2 + "is 7!";
    7 is 7!
```
这时候可以在表达式前加一个空字符串，用来提前强制转换数据类型：
```
> "" + 5 + 2 + "is 7!";
52 is 7!
```
**字符串函数**
使用indexOf函数可以在一个字符串中搜索另外一个字符串。
```
> "Wishy washy winter".indexOf("wash");
6
>
```
截取子字符串可以使用substr（传入参数：开始索引和截取长度）或者slice（传入参数：开始索引和结束索引）。
```
> "Tomjack".substr(0,2);
To
> "Tomjack".slice(0,3);
Tom
>
```
如果字符串有某个分隔符。可以使用split函数将字符串分割成子字符串并返回一个数组：
```
> "a|b|c".split("|");
['a', 'b', 'c']
>
```
可以使用trim函数去除字符串前后的空格。

## 1.6 object
对象是一种相当动态和灵活的数据类型，可以轻松为其新增或者删除属性。创建对象的方式有两种：
```
var o1 = new Object();
var o2 = {};
```
推荐使用后者，它就是对象字面量语法（object literal syntax），它是目前最推荐的写法。
使用对象字面量语法可以指定对象的内容。在初始化时，可以指定对象成员的名字以及对应的值：
```
var user = {
    name : "Tom",
    year : "20"
};
```
注：JSON和对象字面量很相似，但是二者之间有个关键区别：对象字面量使用单引号或者双引号封装属性名，甚至可以不适应引号，而在JSON中所有字符串都需要包含在双引号中。（但是大部分JSON库已经兼容单引号了。）

我们可以使用以下方法为对象添加新属性：
```
user.hair = "black";
user[hair] = "black";
//也可以这样
var attr = "hair";
user[attr] = "black";
```
删除某个属性可以这样：
```
delete user.hair;
```
获取对象大小，使用如下写法（V8 JS）:
```
Object.keys(user).length;
```
## 1.7 array
创建数组也有两种方式：
```
var a1 = new Array();
var a2 = [];
```
推荐使用后者的数组字面量语法（array literal syntax）创建数组。

使用typeof看一下：
```
> typeof(a2);
object
>
```
因为数组实际上就是对象，所以tepeof运算符会返回“object”。V8有一个语言扩展，可以确定是否为一个数组：Array.isArray函数（V8 JS）。
```
> Array.isArray(a2);
true
>
```
可以通过特定的元素索引插入新元素。如果索引超过了最后一个元素，则两者之间的元素会被创建，并初始化为undefined：
```
> arr2.push("a");
> arr2[3] = "d";
> arr2
['a', '', '', 'd']
> arr2[2];
undefined
>
```
可以使用delete删除数组元素，但是结果，看一下：
```
> delete arr[3];
['a', '', '', '']
>
```
可以看到索引3位置对应的元素仍然存在，只是值被设为undefined。
我们可以使用splice函数，它接收删除项的起始索引和结束索引。
```
> arr2.splice(1, 3);
> arr2
['a']
>
```
**实用函数**
push和pop函数让我们向数组的末尾添加或者删除元素。

unshift和shift在数组的头部插入或者删除元素。

与之前提到的split相反，join函数返回一个字符串：
```
> var nums = [1, 2, 3];
> nums.join("，");
'1, 2, 3'
>
```
# 2 函数
JavaScript是一门函数式编程语言（functional programming language），这意味者函数是完全意义上的对象，可以被操纵、扩展，还可以作为数据进行传递。

## 2.1 函数作用域
每次调用函数，都会创建一个新的变量作用域。父作用域中声明的变量对该函数是可见的。但是当函数推出后，该函数作用域中声明的变量就会失效。
```
var height = 3;
var radius = 5;
var volume;
(function() {
    var pir = Math.PI * radius * radius;
    volume = (pir * 3) / 2;
})();
console.log(volume);
console.log(pir);//这时候便会报错，pir is undefined
```
上面的例子中，当匿名函数退出后，里面的私有变量也会消失。

## 2.2 语言结构
JavaScript支持几乎所有的语言操作符和语言结构。它还支持新的for循环--for...in循环。这种循环用于获取对象的所有属性名：
```
var user = {
    firstName : "tom",
    lastName : "ben"
};
for (key in user) {
    console.log(key);
}
for (key in user) {
    //注意这里可不能使用user.key，在循环中，已经转换成数组了
    console.log(user[key]);
}
```

## 2.3 类、原型和继承
JavaScript中所有的类都是以函数的形式定义的。
```
function Shape () {
}
Shape.prototype.x = 0;
Shape.prototype.y = 0;
Shape.prototype.move = function (x,y) {
    this.x = x;
    this.y = y;
}
Shape.prototype.distance = function (x,y) {
    return Math.sqrt(this.x*this.x + this.y*this.y);
}
Shape.prototype.area = function (x,y) {
    throw new Error("Shape没有面积");
}
console.log("以下为Shape类");
var s = new Shape();
s.move(5,3);
console.log(s.distance());
```
默认情况下，所有的JavaScript对象都有一个原型（prototype）对象，它是一种继承属性和方法的机制。
```
function Square () {
}
Square.prototype = new Shape();
Square.prototype._proto_ = Shape.prototype;
Square.prototype.width = 0;
Square.prototype.area = function () {
    return this.width*this.width;
}
console.log("以下为Square类");
var sq = new Square();
sq.move(-5,-5);
sq.width = 5;
console.log(sq.area());
console.log(sq.distance());
//类型测试
console.log(sq instanceof Square);
console.log(sq instanceof Shape);
```
新Square类的代码用到了一个新的语言特性：\_proto\_属性。它告诉JacaScript声明的新类的基本原型应该是指定的类型，因此也就能够从指定的类进行扩展。

此外：可以使用全局变量console来计算程序运行的时间：
```
var label = "运行时间：";
console.time(label);
/*  主要程序代码  */
console.timeEnd(label);
```
输出形如：运行时间：17ms
