import Node from "./node.js";

export default class Tree {
  constructor(array) {
    const duplicateRemovedArray = Tree.#removeDuplicates(array);
    const sortedArray = Tree.#sort(duplicateRemovedArray);
    console.log(sortedArray);
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
}
