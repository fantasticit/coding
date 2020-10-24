import {
  OldCalculator,
  NewCalculator,
  CalculatorAdapter
} from './adapter-pattern';

it('adapter-pattern', () => {
  const calc1 = new OldCalculator();
  expect(calc1.operate(10, 5, 'add')).toBe(15);

  const calc2 = new NewCalculator();
  expect(calc2.add(10, 5)).toBe(15);

  const calc3 = new CalculatorAdapter();
  expect(calc3.operate(10, 5, 'add')).toBe(calc2.add(10, 5));
});
