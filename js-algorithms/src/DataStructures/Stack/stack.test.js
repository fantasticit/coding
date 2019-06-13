const test = require("tape");

const Stack = require("./Stack");

test("stack", t => {
  t.plan(6);

  const stack = new Stack();
  stack.push([0, 1, 2, 3]);
  stack.push(4);

  t.equal(stack.size(), 5);
  t.equal(stack.peek(), 4);

  const element = stack.pop();
  t.equal(element, 4);
  t.equal(stack.size(), 4);

  stack.clear();
  t.equal(stack.size(), 0);
  t.equal(stack.isEmpty(), true);
});
