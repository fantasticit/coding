import { IcecreamFactory } from './flyweight-pattern';

it('flyweight-pattern', () => {
  const factory = new IcecreamFactory();

  const icecream1 = factory.createIcecream('apple');
  const icecream2 = factory.createIcecream('apple');

  expect(icecream1 === icecream2).toBeTruthy();
});
