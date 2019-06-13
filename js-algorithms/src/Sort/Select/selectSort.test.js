const test = require("tape");
const selectSort = require("./index");

test("Select Sort", t => {
  let arr = [5, 3, 4, 1, 2, 0];
  t.plan(1);
  t.looseEqual(selectSort(arr), [0, 1, 2, 3, 4, 5]);
});
