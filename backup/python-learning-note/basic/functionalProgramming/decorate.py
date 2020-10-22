# coding: utf-8

# 基于函数的装饰器


def html(func):
    def wrapped(*args):
        return '<i>' + func(*args) + '</i>'
    return wrapped


@html
def greet(msg):
    return msg


print(greet('hi'))  # <i>hi</i>


# 基于类的装饰器
class Bold():
    def __init__(self, func):
        self.func = func

    def __call__(self, *args, **kwargs):
        return '<b>' + self.func(*args, **kwargs) + '</b>'


@Bold
def hello():
    return 'hello'


print(hello())  # <b>hello</b>

# 带参数的类装饰器


class Italic():
    def __init__(self, tag):
        self.tag = tag

    def __call__(self, func):
        def wrapper(*args, **kwargs):
            return "<{tag}>{res}</{tag}>".format(res=func(*args, **kwargs), tag=self.tag)
        return wrapper


@Italic('em')
def hi():
    return 'hi'


print(hi())  # <em>hi</em>
