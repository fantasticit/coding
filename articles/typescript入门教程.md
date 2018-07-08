![](https://gw.alicdn.com/tfs/TB1_6wnRXXXXXbwXFXXXXXXXXXX-900-500.jpg)


TypeScript扩展了JavaScript的语法，所以任何现有的JavaScript程序可以不加改变的在TypeScript下工作。TypeScript是为大型应用之开发而设计，而编译时它产生 JavaScript 以确保兼容性。

<!--more-->
# 关于调试
以下代码均在 http://www.typescriptlang.org/play/index.html 上运行通过。

# 自动拆分字符串
```
function test(template, name, age) {
	console.log(template);
	console.log(name);
	console.log(age);
}

var myName = "zx";
var getAge = () => 20;

//可以这样调用test函数
test`Hello, my name is ${myName}, I am ${getAge()} years old`;

```
编译后的javascript代码

```
function test(template, name, age) {
	console.log(template);
	console.log(name);
	console.log(age);
}
var myName = "zx";
var getAge = function () { return 20; };
//可以这样调用test函数
(_a = ["Hello, my name is ", ", I am ", " years old"], _a.raw = ["Hello, my name is ", ", I am ", " years old"], test(_a, myName, getAge()));
var _a;

```

# 参数类型
## 声明变量时指定类型
```
var myName: string = 'zx';
console.log(typeof myName);  // string

myName = 20; // 报错，因为已经声明为string类型
```
常见的数据类型：

	- Boolean：布尔类型
	- Number：TypeScript所有的数值类型采用浮点型计数
	- String：字符串类型
	- Array：数组
	- Enum：枚举
	- Any：任何类型，可以用来跳过TypeScript的编译时类型的检查
	- void：表明函数无返回值

## 自定义类型
```
class Person {
	name: string;
	age: number;
}

var people: Person = new Person();

console.log(zx); // Person
```

编译后的javascript代码

```
var Person = (function () {
	function Person() {
	}
	return Person;
}());
var zx = new Person('zx', 10);
console.log(zx);

```

## 给参数指定默认值
```
function test(a: string = 'zx') {
	console.log(a);
}

test();     // zx
test('xz'); // xz
```

编译后的javascript代码

```
function test(a) {
	if (a === void 0) { a = 'zx'; }
	console.log(a);
}
test();
test('xz');
```

## 可选参数
```
function test(a: string, b?:string) {
	console.log(a);
	console.log(b);
}
```
参数b的后面有个?，这就声明了b是可选的。

# Rest and Spread 操作符
```
function test(...args) {
	console.log(args);
}

test(1, 2,  3); // 控制台输出Array(4)
```

注意控制台输出Array(4)，这说明 ...args 是真正的数组，而不是类似数组的对象。
（可以用 Array.form() 转换类似数组的对象）

# generator函数
## 示例
```
function* log() {
	console.log(1);

	yield console.log(2);

	console.log(3);
	console.log(4);

	yield console.log(5);

	console.log(6);
}

let fun = log();

fun.next(); // 1 2

fun.next(); // 3 4 5

fun.next(); // 6
```
通过示例应该可以看出：
	- 用 function* 声明一个generator函数
	- 在其内的代码以 yield 为一个断点
	- 调用 generator 函数需要使用一个辅助变量，并通过 next() 来执行一次（到断点即停）

## 意义
关于这种函数的意义当然是用经典的股票来说明：

```
function* getLowerPrice() {
  while (true) {
    yield Math.ceil(Math.random() * 100);
  }
}

let test = getLowerPrice(),
	price = 100,
	targetPrice = 20;

while (price > targetPrice) {
	price = test.next().value;
}

console.log("Oh, yeah! I get the lowest price ", price);
```
你会看到输出一个比20小的数字，这就是意义？

# 循环
```
let arr = [2, 4, 6, 8];

arr.desc = '我还是数组？';

// forEach
arr.forEach(x => x > 2 ? console.log(x) : null); // 4 6 8

// for in
for (let index in arr) {
	console.log(index);
}
// 输出 0 1 2 3 desc （显然 forin 是循环获取下标，但是desc？）

// for of
for (let item of arr) {
	console.log(item);
}
// 输出 2 4 6 8 （没有desc）
```
从上面可以看出一个 forin 的弊端（也许不是），它打印出了 desc （显然不是数组下标）。

# 泛型
举个例子：
```
let people: Array<Person> = [];
```
这就声明了一个数组，该数组只能存放Person类型数据。

# 类
## 声明一个类

```
class Person {
	name;
	age: number = 20;

	getAge () {
		console.log(this.age);
	}
}

let zx = new Person();
zx.getAge(); // 20
```

## 属性修饰符
与java类似：

	- public
	- protect
	- private

## 构造函数
统一为：

```
constructor () {

}
```

举个例子：

```
class Person {
	private name: string;
	private age: number;

	constructor (name, age) {
		this.name = name;
		this.age = age;
	}

	log () {
		console.log(this.name);
		console.log(this.age);
	}
}

let zx = new Person('zx', 20);
zx.log(); // zx 20

let txj = new Person('txj', 13);
txj.log(); // txj 13
```
## 继承
自然是关键字 `extends` 。

举个例子：
```
class Father {
	private name: string;
	private age: number;

	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	log () {
		console.log(this.name);
		console.log(this.age);
	}
}

class Son extends Father {
	private privateMoney: number;

	constructor(name, age, privateMoney) {
		super(name, age);
		this.privateMoney = privateMoney;
	}

	showOff() {
		console.log("You do not know my private money! ", this.privateMoney);
	}
}


let txj = new Father('txj', 13);
txj.log();

let zx = new Son('zx', 20,  10);
zx.log();
zx.showOff();

```
可以看到子类拥有父类的属性和方法，但是父类就不能拥有子类自己的方法。

# 接口
关键字 `interface`。
举个例子：
```
interface Human {
	sex: string;
}

class Person {
	name: string;
	constructor (public sex : Human, name) {
		this.sex = sex;
		this.name = name;
	}
}

let zx = new Person({sex : 'male'}, 'zx');
```

这就硬性规定了应传入的参数。

当然也可规定必须实现的方法：

```
interface Animal {
	eat();
}

class Dog implements Animal {
	eat () {
		console.log('I am eating');
	}
}

```
