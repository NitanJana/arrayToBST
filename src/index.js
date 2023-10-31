import Tree from "./modules/tree.js";

const nodes = [];

const newTree = new Tree(nodes);
newTree.insert(79);
newTree.insert(80);
newTree.insert(81);
Tree.prettyPrint(newTree.root);
console.log(newTree.isBalanced());
