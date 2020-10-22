# coding: utf-8


def add(x=0):
    def innerAdd(y):
        return x + y

    return innerAdd


print(add(1)(2))
