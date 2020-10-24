/**
 * 原型链模式
 * 此模式是基于对象的创建设计模式。 在此，我们使用一种现有对象的“骨架”来创建或实例化新对象。
 * 这种模式对JavaScript特别重要，并且对JavaScript有益，因为它利用原型继承而不是经典的面向对象的继承。
 */
export const car = {
  wheels: 4,
  start() {
    return 'started';
  },
  stop() {
    return `stoped`;
  }
};
