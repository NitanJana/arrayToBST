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
    else if (key > root.data) root.right = this.#insertRecursive(key, root.right);

    return root;
  }
}
