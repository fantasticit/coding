# coding: utf-8


def func(g, arr):
    return [g(x) for x in arr]


def double(x):
    return x * 2


def square(x):
    return x * x


print(func(double, [1, 2, 3]))
print(func(square, [1, 2, 3]))
