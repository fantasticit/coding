class Animal(object):
    def __init__(self, name):
        self.name = name

    def greet(self):
        print('Hello, I am %s' % (self.name))


class Dog(Animal):
    def greet(self):
        print('Wangwang..., I am dog ', self.name)


class Cat(Animal):
    def greet(self):
        print('Meowmeow..., I am cat ', self.name)


dog = Dog('tom')
dog.greet()     # ('Wangwang..., I am dog ', 'tom')

cat = Cat('lisa')
cat.greet()     # ('Meowmeow..., I am cat ', 'lisa')
