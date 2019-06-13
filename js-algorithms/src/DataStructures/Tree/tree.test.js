const test = require("tape");
const BinarySearchTree = require("./BinaryTree");

test("BinarySearchTree", t => {
  const tree = new BinarySearchTree();

  tree.insert(11);
  tree.insert(7);
  tree.insert(15);
  tree.insert(12);
  tree.insert(16);

  t.plan(6);

  t.equal(tree.min(), 7);
  t.equal(tree.max(), 16);

  let a = [];
  tree.preOrderTraverse(v => a.push(v));
  t.looseEqual(a, [11, 7, 15, 12, 16]);

  a = [];
  tree.inOrderTraverse(v => a.push(v));
  t.looseEqual(a, [7, 11, 12, 15, 16]);

  a = [];
  tree.postOrderTraverse(v => a.push(v));
  t.looseEqual(a, [7, 12, 16, 15, 11]);

  tree.remove(15);

  a = [];
  tree.postOrderTraverse(v => a.push(v));
  t.looseEqual(a, [7, 12, 16, 11]);
});
