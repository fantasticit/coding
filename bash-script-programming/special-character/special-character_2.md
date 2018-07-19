# bash 中的特殊字符（下）

## 1 小括号（`()`）

### 1.1 命令组

在括号中的命令会作为一个子 shell 来运行。在括号中的变量，由于是在子 shell 中，所以对于脚本剩下的部分是不可用的。父进程，也就是脚本本身，将不能够读取在子进程中创建的变量，也就是在子 shell 中创建的变量。

```shell
#!/bin/bash

a=10
( a=20; )

echo $a   # 10
```

### 1.2 初始化数组

创建数组。

```shell
#!/bin/bash

arr=(1 2 3)   # 注意是以空格分割
echo ${arr[0]} # 1
```

## 2 大括号（{}）

### 2.1 文件名扩展

举个例子，复制 `t.txt` 内容到 `t.bak`中：

```shell
#!/bin/bash

if [ ! -w 't.txt' ]; then
  touch t.txt
fi

echo 'hello t.txt' > t.txt;
cp t.{txt,bak}
```

注意： 在大括号中，不允许有空白，除非这个空白被引用或转义。

### 2.2 代码块

代码块，又称 _内部组_，这个结构实际上是创建了一个匿名函数，但是其中声明的变量，对于脚本其他部分可见。

```shell
#!/bin/bash

a=10
{ a=20; }

echo $a # 20
```

## 3 中括号

### 3.1 条件测试

条件测试表达式放置于 `[]` 中。

```shell
#!/bin/bash

a=10

if [ $a -lt 15 ]; then
  echo "$a < 15"
else
  echo "$a > 15"
fi
```

### 3.2 数组元素

```shell
#!/bin/bash

arr=(10 11 12)
arr[0]=13
echo ${arr[0]} # 13
```

## 4 尖括号（< & >）

重定向。

- test.sh > filename：重定向 test.sh 的输出到文件 filename 中。如果 filename 存在的话，那么将会被覆盖。

- test.sh &> filename：重定向 test.sh 的 stdout（标准输出）和 stderr（标准错误）到 filename 中。

- test.sh >&2：重定向 test.sh 的 stdout 到 stderr 中。

- test.sh >> filename：把 test.sh 的输出追加到文件 filename 中。如果 filename 不存在的话，将会被创建。

## 5 管道（|）

分析左侧命令的输出，并将该输出作为右侧命令的输入。

```shell
ps -aux | grep 8080
```

## 6 波浪号（~）

表示 `home` 目录。
