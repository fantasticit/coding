class A(object):
    def __init__(self, name):
        self.name = name

    def __call__(self, msg):
        print(msg)


a = A('a')
a('hi')   # hi
