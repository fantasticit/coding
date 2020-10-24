/**
 * 责任链模式
 * 这是一种行为设计模式，提供了一系列松散耦合的对象。 这些对象中的每一个都可以选择执行或处理客户端的请求。
 * 责任链模式的一个很好的例子是DOM中的事件冒泡，其中事件通过一系列嵌套的DOM元素传播，其中一个嵌套的DOM元素可能附加有“事件侦听器”以侦听事件并对该事件采取行动。
 */
export class Sum {
  public sum: number;

  constructor(initialValue: number) {
    this.sum = initialValue;
  }

  add(num) {
    this.sum += num;
    return this;
  }
}
