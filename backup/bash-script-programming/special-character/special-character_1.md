# bash 中的特殊字符（上）

## 1 注释（#）

行首以 `#` 开头（除 `#!` 之外）的是注释。`#!` 用于指定当前脚本的解释器。

```shell
#!/bin/bash

echo 'The # here is not comment'
echo The \# here is not comment  # 注意转义字符
echo The # here is not comment
```

## 2 分号（;）

### 2.1 命令分隔符

使用分号（;）可以在同一行写多个命令。

```shell
#!/bin/bash

echo 'Now start...';
filename=semi.sh
if [ -e "$filename" ]; then
  echo "File $filename exists."; cp $filename $filename.bak # cp 复制命令
else
  echo "File $filename not found"; touch $filename          # touch 创建文件
fi;
  echo "End"
```

### 2.2 终止 `case` 选项

使用双分号（;;）可以终止 `case` 选项（类似于其他语言中的 `break`）。

```shell
#!/bin/bash

char=b

case "$char" in
  [a-z]) echo "letter";;
  [0-9]) echo "number";;
esac
```

## 3 点号（.）

等价于 `source` 命令（bash 中的 `source` 命令用于在当前 `bash` 环境下读取并执行 指定的 sh 文件）。

```shell
$ source hello.sh
hi
$ . hello.sh
hi
```

## 4 引号

### 4.1 双引号（"）

由双引号括起来的字符，除$（美元符号）、\（反斜杠）、’（单引号）、和”（双引号）这几个字符仍是特殊字符并保留其特殊功能外，其余字符仍作为普通字符对待。

### 4.2 单引号（'）

由单引号括起来的字符都作为普通字符出现。特殊字符用单引号括起来以后，也会失去原有意义，而只作为普通字符解释。

### 4.3 区别

举个例子：

```shell
name=difference

echo '$name' # name
echo "$name" # difference
```

同样是 `$name`，单引号则认为是字符串，而双引号则认为是一个变量。

## 5 斜线和反斜线

### 5.1 斜线（/）

文件名路径分隔符。分隔文件名不同的部分（如`/home/repo`）。也可以用来作为除法算术操作符。在 linux 中表示路径的时候，许多个/跟一个/是一样的。`/home/repo` 等同于 `////home///repo`

### 5.2 反斜线（\）

转义字符。

## 6 反引号

反引号（\`）中的命令会优先执行（推荐使用`$()`代替`\``）。

```shell
cp `mkdir temp` hello.sh temp  # 先创建 temp 文件夹，再将 hello.sh 复制到 temp 文件夹
cp $(mkdir temp) hello.sh temp
```

## 7 冒号（:）

### 7.1 空命令

等价于 “NOP”（`no op`，该命令什么也不做）。`:` 命令是 bash 内建命令，退出码是 `0`。

```shell
#!/bin/bash

num=5

if [ $num -gt 2 ] # gt 表示 greater than（大于）
  then :          # 什么都不做，退出分支
else
  echo "$num"
fi
```

### 7.2 其他功能

与 `>` 重定向操作符结合使用时，可以清空一个文件，但是不会修改这个文件的权限。如果这个文件之前不存在，则先创建这个文件。

```shell
: > null.sh
```

## 8 问号（?）

在双括号中就是三元操作符。

```shell
#!/bin/bash

((t=8<10?15:5))
echo $t
```

## 9 美元符号（$）

变量替换。

```shell
#!/bin/bash

a=10
echo $a
```
