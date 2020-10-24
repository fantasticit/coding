import Hero from './constructor-pattern';

it('constructor-pattern', () => {
  const iron = new Hero('IronMan', 'yp');
  expect(iron.describe()).toEqual(`I am IronMan, I can yp`);
});
