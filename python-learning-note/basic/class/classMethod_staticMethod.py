class A():
    bar = 1

    @classmethod
    def class_foo(cls):
        print(cls.bar)

    @staticmethod
    def static_foo():
        print(A.bar)


A.class_foo()  # 1
A.static_foo()  # 1
