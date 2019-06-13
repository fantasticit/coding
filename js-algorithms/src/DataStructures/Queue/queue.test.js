const test = require("tape");

const Queue = require("./Queue");
const PriorityQueue = require("./PriorityQueue");

test("queue", t => {
  t.plan(6);

  const queue = new Queue();
  queue.enqueue([0, 1, 2, 3]);
  queue.enqueue(4);

  t.equal(queue.size(), 5);
  t.equal(queue.front(), 0);

  const element = queue.dequeue();
  t.equal(element, 0);
  t.equal(queue.size(), 4);

  queue.clear();
  t.equal(queue.size(), 0);
  t.equal(queue.isEmpty(), true);
});

test("priority queue", t => {
  const queue = new PriorityQueue();

  queue.enqueue([
    {
      element: 10,
      priority: 10
    },

    {
      element: 0,
      priority: 9
    },

    {
      element: 2,
      priority: 4
    }
  ]);

  t.plan(3);
  t.equal(queue.dequeue().priority, 10);
  t.equal(queue.front().element, 0);
  t.equal(queue.front().priority, 9);
});
