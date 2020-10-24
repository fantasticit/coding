import { Subject, Observer } from './observer-pattern';

it('observer-pattern', () => {
  const ob1 = new Observer(1);
  const ob2 = new Observer(3);
  const sub = new Subject();
  sub.subscribe(ob1);
  sub.subscribe(ob2);
  sub.fire('inc');
  expect(ob1.state).toBe(2);
  expect(ob2.state).toBe(4);
});
