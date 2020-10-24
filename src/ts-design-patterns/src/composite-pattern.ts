/**
 * 组合模式
 * 组合模式对单个对象(叶子对象)和组合对象(组合对象)具有一致性，它将对象组织到树结构中，可以用来描述整体与部分的关系。
 * 同时它也模糊了简单元素(叶子对象)和复杂元素(容器对象)的概念，使得客户能够像处理简单元素一样来处理复杂元素，从而使客户程序能够与复杂元素的内部结构解耦。
 * 使用多级菜单示例。 每个节点可以是一个不同的选项，也可以是一个菜单本身，它的子级具有多个选项。 具有子级的节点组件是复合组件，而没有任何子级的节点组件是叶组件。
 */
export class Component {
  static logTreeStructure(root) {
    let treeStructure = '';
    function traverse(node, indent = 0) {
      treeStructure += `${'--'.repeat(indent)}${node.getName()}\n`;
      indent++;
      for (let i = 0, length = node.noOfChildren(); i < length; i++) {
        traverse(node.getChildByIndex(i), indent);
      }
    }
    traverse(root);
    return treeStructure;
  }

  private type: string;
  private name: string;

  constructor(name, type) {
    this.name = name;
    this.type = type;
  }

  getType() {
    return this.type;
  }

  getName() {
    return this.name;
  }

  addChild(component) {}

  removeChildByName(componentName) {}

  removeChildByIndex(index) {}

  getChildByName(componentName) {}

  getChildByIndex(index) {}

  noOfChildren() {}
}

export class Leaf extends Component {
  constructor(name) {
    super(name, 'Leaf Node');
  }
}

export class Composite extends Component {
  private children: Array<Component>;

  constructor(name) {
    super(name, 'Composite Node');
    this.children = [];
  }

  addChild(child) {
    this.children = [...this.children, child];
  }

  removeChildByName(name) {
    this.children = this.children.filter(child => child.getName() !== name);
  }

  removeChildByIndex(index) {
    this.children = [
      ...this.children.slice(0, index),
      ...this.children.slice(index + 1)
    ];
  }

  getChildByName(name) {
    return this.children.find(child => child.getName() === name);
  }

  getChildByIndex(index) {
    return this.children[index];
  }

  noOfChildren() {
    return this.children.length;
  }
}
