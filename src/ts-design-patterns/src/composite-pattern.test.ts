import { Component, Leaf, Composite } from './composite-pattern';

it('composite-pattern', () => {
  const tree = new Composite('root');

  tree.addChild(new Leaf('left'));

  const right = new Composite('right');
  tree.addChild(right);

  right.addChild(new Leaf('right-left'));

  const middle = new Composite('right-middle');
  right.addChild(middle);

  right.addChild(new Leaf('right-right'));

  let result = `root\n`;
  result += `--left\n`;
  result += `--right\n`;
  result += `----right-left\n`;
  result += `----right-middle\n`;
  result += `----right-right\n`;

  expect(Component.logTreeStructure(tree)).toBe(result);
});
