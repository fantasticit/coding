class A(object):
    __slots__ = ('name', 'y')

    def __init__(self, name):
        self.name = name


a = A('a')
# a.age = 20         # AttributeError: 'A' object has no attribute 'age'
