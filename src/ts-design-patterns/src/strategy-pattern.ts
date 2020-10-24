/**
 * 策略模式
 * 这是一种行为设计模式，可以封装特定任务的替代算法。 它定义了一系列算法，并以一种在运行时可以互换的方式封装它们。
 */
export class Commute {
  travel(transport) {
    return transport.travelTime();
  }
}

class Vehicle {
  private time: number;

  constructor(time) {
    this.time = time;
  }

  travelTime() {
    return this.time;
  }
}

export class Bus extends Vehicle {
  constructor() {
    super(10);
  }
}

export class Taxi extends Vehicle {
  constructor() {
    super(5);
  }
}
