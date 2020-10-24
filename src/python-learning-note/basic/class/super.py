class Base(object):
    def __init__(self):
        print("Enter Base")
        print("Leave Base")


class A(Base):
    def __init__(self):
        print("Enter A")
        super(A, self).__init__()
        print("Leave A")


class B(Base):
    def __init__(self):
        print("Enter B")
        super(B, self).__init__()
        print("Leave B")


class C(A, B):
    def __init__(self):
        print("Enter C")
        super(C, self).__init__()
        print("Leave C")


c = C()
print(C.mro())
