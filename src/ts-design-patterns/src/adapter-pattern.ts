/**
 * 适配器模式
 * 这是一种结构模式，其中一类的接口转换为另一类。 这种模式使类可以协同工作，否则由于接口不兼容而无法实现。
 * 此模式通常用于为新的重构API创建包装器，以便其他现有的旧API仍可以与它们一起使用。
 * 通常是在新的实现或代码重构（由于诸如性能提升之类的原因而完成）导致使用不同的公共API时，而系统的其他部分仍在使用旧的API，并且需要进行调整以共同工作时，才可以这样做。
 */
export class OldCalculator {
  operate(num1: number, num2: number, operate: string): number {
    switch (operate) {
      case 'add':
        return num1 + num2;

      case 'sub':
      default:
        return num1 - num2;
    }
  }
}

export class NewCalculator {
  add(num1: number, num2: number): number {
    return num1 + num2;
  }

  sub(num1: number, num2: number): number {
    return num1 - num2;
  }
}

export class CalculatorAdapter {
  private calculator: NewCalculator;

  constructor() {
    this.calculator = new NewCalculator();
  }

  operate(num1: number, num2: number, operate: string): number {
    switch (operate) {
      case 'add':
        return this.calculator.add(num1, num2);

      case 'sub':
      default:
        return this.calculator.sub(num1, num2);
    }
  }
}
