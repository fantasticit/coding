/**
 * 装饰器模式
 * 一种结构设计模式，着重于向现有类动态添加行为或功能的能力。 这是子分类的另一种可行的替代方法。
 */
export class Book {
  private name: string;
  private price: number;

  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

export function giftWrap(book) {
  book.isGiftWrapped = true;

  return book;
}

export function hardbindBook(book) {
  book.isHardbind = true;
  book.price += 5;
  return book;
}
