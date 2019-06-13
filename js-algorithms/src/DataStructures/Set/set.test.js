const test = require("tape");
const Set = require("./Set");

test("Set", t => {
  const set = new Set();
  set.add(1);
  set.add(2);

  t.plan(3);
  t.equal(set.has(1), true);
  t.equal(set.has(3), false);

  set.delete(1);
  t.equal(set.has(1), false);
});

test("Set union", t => {
  const s1 = new Set();
  s1.add(0);
  s1.add(1);

  const s2 = new Set();
  s2.add(1);
  s2.add(2);

  const s = s1.union(s2);

  t.plan(1);
  t.looseEqual(s.values(), ["0", "1", "2"]);
});

test("Set intersection", t => {
  const s1 = new Set();
  s1.add(0);
  s1.add(1);

  const s2 = new Set();
  s2.add(1);
  s2.add(2);

  const s = s1.intersection(s2);

  t.plan(1);
  t.looseEqual(s.values(), ["1"]);
});

test("Set difference", t => {
  const s1 = new Set();
  s1.add(0);
  s1.add(1);

  const s2 = new Set();
  s2.add(1);
  s2.add(2);

  const s = s1.difference(s2);

  t.plan(1);
  t.looseEqual(s.values(), ["0"]);
});

test("Set subset", t => {
  const s1 = new Set();
  s1.add(0);
  s1.add(1);

  const s2 = new Set();
  s2.add(1);

  t.plan(1);
  t.equal(s2.subset(s1), true);
});
