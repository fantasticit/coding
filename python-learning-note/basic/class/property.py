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
