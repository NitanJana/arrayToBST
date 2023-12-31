import Node from "./node.js";

export default class Tree {
  constructor(array) {
    const duplicateRemovedArray = Tree.#removeDuplicates(array);
    const sortedArray = Tree.#sort(duplicateRemovedArray);
    this.root = this.#buildTree(sortedArray);
  }

  static #removeDuplicates(sortedArray) {
    return Array.from(new Set(sortedArray));
  }

  static #sort(array) {
    return array.sort((a, b) => a - b);
  }

  static prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      Tree.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      Tree.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  #buildTree(sortedArray) {
    if (sortedArray.length === 0) return null;

    const mid = Math.floor(sortedArray.length / 2);
    const root = new Node(sortedArray[mid]);
    root.left = this.#buildTree(sortedArray.slice(0, mid));
    root.right = this.#buildTree(sortedArray.slice(mid + 1));
    return root;
  }

  insert(key) {
    if (this.root === null) {
      this.root = new Node(key);
    } else {
      this.#insertRecursive(key, this.root);
    }
  }

  #insertRecursive(key, root) {
    if (root === null) return new Node(key);
    if (key < root.data) root.left = this.#insertRecursive(key, root.left);
    else if (key > root.data)
      root.right = this.#insertRecursive(key, root.right);

    return root;
  }

  delete(key) {
    this.root = this.#deleteRecursive(key, this.root);
  }

  #deleteRecursive(key, root) {
    if (root === null) return root;
    if (key < root.data) {
      root.left = this.#deleteRecursive(key, root.left);
      return root;
    }
    if (key > root.data) {
      root.right = this.#deleteRecursive(key, root.right);
      return root;
    }

    if (root.left === null) {
      return root.right;
    }
    if (root.right === null) {
      return root.left;
    }

    let succParent = root;
    let succ = root.right;

    while (succ.left !== null) {
      succParent = succ;
      succ = succ.left;
    }
    if (succParent !== root) {
      succParent.left = succ.right;
    } else {
      succParent.right = succ.right;
    }
    root.data = succ.data;
    return root;
  }

  find(key, root = this.root) {
    const node = root;
    if (node === null) return null;
    if (node.data !== key) {
      return node.key < key
        ? this.find(key, node.right)
        : this.find(key, node.left);
    }
    return node;
  }

  levelOrder(callback, result = [], queue = []) {
    if (!this.root) return result;
    queue.push(this.root);
    while (queue.length) {
      const current = queue.shift();
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
      result.push(current.data);
      if (callback) callback(current);
    }
    return result;
  }

  inOrder(callback, result = [], root = this.root) {
    if (!root) return result;
    if (root.left) this.inOrder(callback, result, root.left);
    if (callback) callback(root);
    result.push(root.data);
    if (root.right) this.inOrder(callback, result, root.right);
    return result;
  }

  preOrder(callback, result = [], root = this.root) {
    if (!root) return result;
    if (callback) callback(root);
    result.push(root.data);
    if (root.left) this.preOrder(callback, result, root.left);
    if (root.right) this.preOrder(callback, result, root.right);
    return result;
  }

  postOrder(callback, result = [], root = this.root) {
    if (!root) return result;
    if (root.left) this.postOrder(callback, result, root.left);
    if (root.right) this.postOrder(callback, result, root.right);
    if (callback) callback(root);
    result.push(root.data);
    return result;
  }

  height(root = this.root) {
    if (!root) return -1;
    return Math.max(this.height(root.left), this.height(root.right)) + 1;
  }

  depth(key, root = this.root, depth = 0) {
    if (!root || !key) return -1;
    if (key === root.data) return depth;
    if (key < root.data) return this.depth(key, root.left, depth + 1);
    if (key > root.data) return this.depth(key, root.right, depth + 1);
    return -1;
  }

  isBalanced(root = this.root) {
    if (!root) return true;
    return Math.abs(this.height(root.left) - this.height(root.right)) < 2;
  }

  rebalance(root=this.root) {
    if (!root) return;
    const sortedArray = Tree.#sort(this.inOrder());
    this.root = this.#buildTree(sortedArray);
  }
}
