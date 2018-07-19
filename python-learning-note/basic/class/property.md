# 使用 `@property`

```python
class Exam(object):
    def __init__(self, score):
        self._score = score

    def get_score(self):
        return self._score

    def set_score(self, val):
        self._score = val

e = Exam(60)
e.get_score() # 60
e.set_score(70)
e.get_score() # 70
```

在上面，我们定义了一个 Exam 类，为了避免直接对 \_score 属性操作，我们提供了 get_score 和 set_score 方法，这样起到了封装的作用，把一些不想对外公开的属性隐蔽起来，而只是提供方法给用户操作，在方法里面，我们可以检查参数的合理性等。

这样做没什么问题，但是我们有更简单的方式来做这件事，Python 提供了 property 装饰器，被装饰的方法，我们可以将其『当作』属性来用，看下面的例子：

```python
class Exam(object):
    def __init__(self, score):
        self.__score = score

    @property
    def score(self):
        return self.__score

    @score.setter
    def score(self, val):
        self.__score = val


e = Exam(50)
print(e.score)  # 50

e.score = 60
print(e.score)  # 60
```

另外，也不一定要使用 `score.setter` 这个装饰器，这时 `score` 就变成一个只读属性。
