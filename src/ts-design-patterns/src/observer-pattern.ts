/**
 * 观察者模式
 * 这是一种至关重要的行为设计模式，它定义了对象之间的一对多依赖关系，以便当一个对象（发布者）更改其状态时，所有其他依赖对象（订阅者）都将得到通知并自动更新。
 * 这也称为PubSub（发布者/订阅者）或事件分发者/监听者模式。 发布者有时称为主题，订阅者有时称为观察者。
 */
export class Observer {
  public state: number;
  private initialState: number;

  constructor(num) {
    this.state = num;
    this.initialState = num;
  }

  update(signal) {
    switch (signal) {
      case 'inc':
        this.state = this.state + 1;
        break;
      default:
        this.state = this.initialState;
        break;
    }
  }
}

export class Subject {
  private observers: Array<Observer>;

  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  fire(signal) {
    this.observers.forEach(observer => {
      observer.update(signal);
    });
  }
}
