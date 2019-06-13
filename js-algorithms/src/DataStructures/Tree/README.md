# Tree

```shell
          11
       /      \
      7       15
     / \     /  \
    3   6   12  16
```

一个树结构包含一系列存在父子关系的节点。每个节点都有一个父节点（除了顶部根节点）以及零个或多个子节点。

位于树顶部的节点叫做 **根节点（11）**。树中每个元素都叫做 **节点**，节点分为 **内部节点** 和 **外部节点**。至少有一个子节点的节点称为 **内部节点**，无子节点的节点称为 **外部节点** 或 **叶节点**。

有关树的另一个术语称为 **子树**。子树由节点和它的后代构成。

节点的一个属性是 **深度**。节点的深度取决于其祖先节点的数量，如节点 3 有 2 个祖先节点，它的深度为 2。

树的高度取决于所有节点深度的最大值，

## 二叉树 和 二叉搜索树

二叉树中的节点最多只能有 2 个子节点：左侧子节点 和 右侧子节点。
二叉搜索树是二叉树的一种，但是它只允许在左侧子节点存储比父节点小的值，在右侧子节点存储大于等于父节点的值。

### 创建 二叉搜索树

结构声明：

```javascript
class Node {
  construtor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}
```

接口设计：

- insert(key): 向树中插入一个新的键
- search(key): 在树中查找一个键
- inOrderTraverse(): 中序遍历
- preOrderTraverse(): 先序遍历
- postOrderTraverse(): 后序遍历
- min(): 返回树中最小值
- max(): 返回树中最大值
- remove(key): 从树中移除某个键

代码实现：

```javascript
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

      console.log("remove", node, key);

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
```
