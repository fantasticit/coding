# map / reduce / filter

`map / reduce / filter` 是 Python 较为常用的内建高阶函数。

## map

`map` 的使用形式为:

```python
  map(func, sequence)
```

解释：对 `sequence`中的每一项 item 执行 func(item)，并将结果以一个 List 返回。

```shell
>>> def double(x):
...     return x * 2
...
>>> map(double, [1, 2, 3])
[2, 4, 6]
>>> map(lambda x: x * x, [1, 2, 3])
[1, 4, 9]
```

## reduce

`reduce` 的使用形式为:

```python
  reduce(func, sequence[, initial])
```

解释：先将 sequence 的前两个 item 传给 function，即 function(item1, item2)，函数的返回值和 sequence 的下一个 item 再传给 function，即 function(function(item1, item2), item3)，如此迭代，直到 sequence 没有元素，如果有 initial，则作为初始值调用。

也就是说：

```shell
reduece(f, [x1, x2, x3, x4]) = f(f(f(x1, x2), x3), x4)
```

举个例子：

```shell
>>> reduce(lambda x, y: x * y, [1, 2], 3)
6
```

## filter

`filter` 用于过滤函数，使用形式如下：

```python
  filter(func, sequence)
```

解释：将 function 依次作用于 sequnce 的每个 item，即 function(item)，将返回值为 True 的 item 组成一个 List/String/Tuple (取决于 sequnce 的类型，python3 统一返回迭代器) 返回。

```shell
>>> filter(lambda x: x % 2 == 0, [1, 2, 3, 4])
[2, 4]
```
