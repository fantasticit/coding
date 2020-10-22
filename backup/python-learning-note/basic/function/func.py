# coding: utf-8


def greet(msg, repeat=1):
    result = ''
    for i in range(0, repeat):
        result += msg + ' '
    return result


print(greet(repeat=3, msg='hi'))  # hi hi hi
