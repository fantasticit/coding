import { car } from './prototype-pattern';

it('prototype-pattern', () => {
  const mycar = Object.create(car, { wheels: { value: 3 } });
  expect(mycar.__proto__ === car).toBeTruthy();
});
