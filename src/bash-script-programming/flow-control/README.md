# 流程控制

## 1. if else

### 1.1 if

```shell
if condition; then
  # commands here
fi
```

### 1.2 if else

```shell
if condition; then
  # commands here
else
  # other commands here
fi
```

### 1.3 if-elif-else

```shell
if condition; then
  # commands here
elif codition; then
  # other commands here
else
  # other commands here
fi
```

## 2 for 循环

```shell
for var in item1 iten2 ..itemN
do
  # commands here
done
```

例如：

```shell
#!/bin/bash

for substr in This is a string
do
  echo "$substr"
done
```

输出：

```shell
This
is
a
string
```

## 3 while 语句

```shell
while condition
do
  # command here
done
```

## 4 until 循环

`until`循环在条件为真时停止。循环至少执行一次。

```shell
until condition
do
  # command here
done
```

## 5 case

```shell
case 值 in
模式1)
    # commands here
    ;;
模式2）
    # other commands here
    ;;
esca
```

## 6 break

`break` 用于跳出所有循环。

## 7 continue

`continue`用于结束当前循环。
