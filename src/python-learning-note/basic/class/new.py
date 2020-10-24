# coding: utf-8


class A(object):
    __dict = dict()

    def __new__(cls):
        if 'key' in A.__dict:
            print('已经存在')
            return A.__dict['key']
        else:
            print('New')
            return object.__new__(cls)

    def __init__(self):
        print('Init')
        A.__dict['key'] = self


a1 = A()
a2 = A()
a3 = A()

# New
# Init
# 已经存在
# Init
# 已经存在
# Init
