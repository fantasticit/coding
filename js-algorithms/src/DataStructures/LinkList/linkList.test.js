const test = require("tape");
const LinkList = require("./LinkList");
const DoublyLinkList = require("./DoublyLinkList");

test("LinkList", t => {
  const linkList = new LinkList();

  t.plan(7);

  linkList.append(0);
  linkList.append(1);
  linkList.append(2);
  linkList.append(4);
  linkList.append(5);

  t.equal(linkList.size(), 5);
  t.equal(linkList.indexOf(4), 3);

  linkList.insert(3, 3);
  t.equal(linkList.indexOf(4), 4);
  t.equal(linkList.size(), 6);

  linkList.removeAt(3);
  t.equal(linkList.indexOf(4), 3);
  t.equal(linkList.size(), 5);
  t.equal(linkList.isEmpty(), false);
});

test("DoublyLinkList", t => {
  const linkList = new DoublyLinkList();

  t.plan(7);

  linkList.append(0);
  linkList.append(1);
  linkList.append(2);
  linkList.append(4);
  linkList.append(5);

  t.equal(linkList.size(), 5);
  t.equal(linkList.indexOf(4), 3);

  linkList.insert(3, 3);
  t.equal(linkList.indexOf(4), 4);
  t.equal(linkList.size(), 6);

  linkList.removeAt(3);
  t.equal(linkList.indexOf(4), 3);
  t.equal(linkList.size(), 5);
  t.equal(linkList.isEmpty(), false);
});
