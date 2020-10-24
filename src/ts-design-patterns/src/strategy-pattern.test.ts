import { Commute, Bus, Taxi } from './strategy-pattern';

it('strategy-pattern', () => {
  const commute = new Commute();

  expect(commute.travel(new Bus())).toBe(10);
  expect(commute.travel(new Taxi())).toBe(5);
});
