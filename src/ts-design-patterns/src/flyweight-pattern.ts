/**
 * 享元模式
 * 这是一种结构设计模式，致力于通过细粒度对象进行有效的数据共享。 它用于效率和节省内存的目的。
 * 此模式可用于任何类型的缓存目的。 实际上，现代浏览器使用了flyweight模式的变体来防止两次加载相同的图像。
 */
export class Icecream {
  private flavour: string;

  constructor(flavour) {
    this.flavour = flavour;
  }

  getFlavour() {
    return this.flavour;
  }
}

export class IcecreamFactory {
  private icecreams: Array<Icecream>;

  constructor() {
    this.icecreams = [];
  }

  createIcecream(flavour) {
    let icecream = this.getIcecream(flavour);

    if (icecream) return icecream;

    icecream = new Icecream(flavour);
    this.icecreams.push(icecream);
    return icecream;
  }

  getIcecream(flavour) {
    return this.icecreams.find(icecream => icecream.getFlavour() === flavour);
  }
}
