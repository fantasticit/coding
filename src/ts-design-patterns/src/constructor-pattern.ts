/**
 * 构造器模式
 * 将一个复杂对象的构建和表示分离，是同样的创建构建过程可以创造不同的表示。
 * 构造器模式是一步一步创建一个复杂的对象，它允许用户可以只通过指定复杂对象的类型和内容就可以构建它们。
 * 使用者不需要知道内部的具体构建细节。该模式是非常类似抽象工厂模式。
 */
export default class Hero {
  private name: string;
  private ability: string;

  constructor(name, ability) {
    this.name = name;
    this.ability = ability;
  }

  describe() {
    return `I am ${this.name}, I can ${this.ability}`;
  }
}
