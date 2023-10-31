import Tree from "./modules/tree.js";

const nodes = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const newTree = new Tree(nodes);
Tree.prettyPrint(newTree.root);
newTree.delete(8);
Tree.prettyPrint(newTree.root);
