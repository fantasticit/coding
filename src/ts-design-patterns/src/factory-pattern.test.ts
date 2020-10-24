import { BallFactory, FootBall, BasketBall } from './factory-pattern';

it('factory-pattern', () => {
  const football = BallFactory.create(FootBall);
  const basketball = BallFactory.create(BasketBall);

  expect(football.kick()).toEqual(`kicked`);
  expect(basketball.bounce()).toEqual(`bounced`);
});
