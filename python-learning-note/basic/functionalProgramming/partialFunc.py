# coding: utf-8

from functools import partial


def multiply(x, y):
    return x * y


print(multiply(2, y=2))
print(multiply(3, y=2))
print(multiply(4, y=2))


double = partial(multiply, 10)
print(double(2))
print(double(3))
print(double(4))
