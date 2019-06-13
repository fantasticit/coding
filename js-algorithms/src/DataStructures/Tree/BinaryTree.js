class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  /**
   * 插入新键
   * @param {*} key
   */
  insert(key) {
    const node = new Node(key);

    if (!this.root) {
      this.root = node;
    } else {
      insertNode(this.root, node);
    }

    function insertNode(node, newNode) {
      if (newNode.key < node.key) {
        if (node.left === null) {
          node.left = newNode;
        } else {
          insertNode(node.left, newNode);
        }
      } else {
        if (node.right === null) {
          node.right = newNode;
        } else {
          insertNode(node.right, newNode);
        }
      }
    }
  }

  /**
   * 中序遍历
   */
  inOrderTraverse(cb) {
    inOrderTraverse(this.root, cb);

    function inOrderTraverse(node, cb) {
      if (node !== null) {
        inOrderTraverse(node.left, cb);
        typeof cb === "function" && cb(node.key);
        inOrderTraverse(node.right, cb);
      }
    }
  }

  /**
   * 先序遍历
   */
  preOrderTraverse(cb) {
    preOrderTraverse(this.root, cb);

    function preOrderTraverse(node, cb) {
      if (node !== null) {
        typeof cb === "function" && cb(node.key);
        preOrderTraverse(node.left, cb);
        preOrderTraverse(node.right, cb);
      }
    }
  }

  /**
   * 后序遍历
   * @param {*} cb
   */
  postOrderTraverse(cb) {
    postOrderTraverse(this.root, cb);
    function postOrderTraverse(node, cb) {
      if (node !== null) {
        postOrderTraverse(node.left, cb);
        postOrderTraverse(node.right, cb);
        typeof cb === "function" && cb(node.key);
      }
    }
  }

  /**
   * 最小值
   */
  min() {
    function min(node) {
      if (node) {
        while (node && node.left !== null) {
          node = node.left;
        }

        return node.key;
      }

      return null;
    }

    return min(this.root);
  }

  /**
   * 最大值
   */
  max() {
    function max(node) {
      if (node) {
        while (node && node.right !== null) {
          node = node.right;
        }

        return node.key;
      }

      return null;
    }

    return max(this.root);
  }

  /**
   * 搜索
   * @param {*} key
   */
  search(key) {
    function search(node, key) {
      if (node === null) {
        return false;
      }

      if (key < node.key) {
        return search(node.left, key);
      }

      if (key > node.right) {
        return search(node.right, key);
      }

      return node;
    }

    return search(this.root, key);
  }

  /**
   * 移除
   * @param {*} key
   */
  remove(key) {
    this.root = remove(this.root, key);

    function findMinNode(node) {
      if (node) {
        while (node && node.left !== null) {
          node = node.left;
        }

        return node;
      }

      return null;
    }

    function remove(node, key) {
      if (node === null) {
        return null;
      }

      if (key < node.key) {
        node.left = remove(node.left, key);
        return node;
      } else if (key > node.key) {
        node.right = remove(node.right, key);
        return node;
      } else {
        if (node.left === null && node.right === null) {
          // 叶节点
          node = null;
          return node;
        }

        if (node.left === null) {
          node = node.right;
          return node;
        }

        if (node.right === null) {
          node = node.left;
          return node;
        }

        let min = findMinNode(node.right);
        node.key = min.key;
        node.right = remove(node.right, min.key);
        return node;
      }
    }
  }
}

module.exports = BinarySearchTree;
