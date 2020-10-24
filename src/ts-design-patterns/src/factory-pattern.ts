/**
 * 工厂模式
 * 工厂模式是另一种基于类的创建模式。 在此，我们提供了一个通用接口，该接口将对象实例化的职责委托给它的子类。
 * 当我们需要管理或操作不同但具有许多相似特征的对象集合时，通常使用此模式。
 */
class Ball {
  private type: string;

  constructor(type) {
    this.type = type;
  }
}

export class FootBall extends Ball {
  constructor() {
    super('football');
  }

  kick() {
    return 'kicked';
  }
}

export class BasketBall extends Ball {
  constructor() {
    super('basketball');
  }

  bounce() {
    return 'bounced';
  }
}

export class BallFactory {
  static create<T extends Ball>(C: { new (): T }): T {
    return new C();
  }
}
