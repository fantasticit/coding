import { Sum } from './chain-of-responsibility-pattern';

it('chain-of-responsibility-pattern', () => {
  const sum = new Sum(1);
  expect(sum.add(2).add(3).sum).toBe(6);
});
