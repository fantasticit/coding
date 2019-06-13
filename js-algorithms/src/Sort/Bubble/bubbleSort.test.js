const test = require("tape");
const bubbleSort = require("./index");

test("Bubble Sort", t => {
  let arr = [5, 3, 4, 1, 2, 0];
  t.plan(1);
  t.looseEqual(bubbleSort(arr), [0, 1, 2, 3, 4, 5]);
});
