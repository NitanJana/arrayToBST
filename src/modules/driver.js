import Tree from "./tree.js";

export default class Driver {
  static randomArray(size, maxNumber = 100) {
    const array = [];
    for (let i = 0; i < size; i += 1) {
      array.push(Math.floor(Math.random() * maxNumber));
    }
    return array;
  }

  static insertRandomNodes(tree, size, minNumber = 100, maxNumber = 500) {
    for (let i = 0; i < size; i += 1) {
      tree.insert(Math.floor(Math.random() * (maxNumber - minNumber) + minNumber));
    }
  }

  static loadDriverScript() {
    const binaryTree = new Tree(Driver.randomArray(20, 100));

    Tree.prettyPrint(binaryTree.root);
    console.log(`Balanced -> ${binaryTree.isBalanced()}`);
    console.log(`LevelOrder -> ${binaryTree.levelOrder()}`);
    console.log(`PreOrder -> ${binaryTree.preOrder()}`);
    console.log(`InOrder -> ${binaryTree.inOrder()}`);
    console.log(`PostOrder -> ${binaryTree.postOrder()}`);

    Driver.insertRandomNodes(binaryTree, 4, 100, 500);

    Tree.prettyPrint(binaryTree.root);
    console.log(`Balanced -> ${binaryTree.isBalanced()}`);

    binaryTree.rebalance();

    Tree.prettyPrint(binaryTree.root);
    console.log(`Balanced -> ${binaryTree.isBalanced()}`);
    console.log(`LevelOrder -> ${binaryTree.levelOrder()}`);
    console.log(`PreOrder -> ${binaryTree.preOrder()}`);
    console.log(`InOrder -> ${binaryTree.inOrder()}`);
    console.log(`PostOrder -> ${binaryTree.postOrder()}`);
  }
}
