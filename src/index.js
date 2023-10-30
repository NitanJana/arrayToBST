import Tree from "./modules/tree.js";

const points = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const newTree = new Tree(points);
Tree.prettyPrint(newTree.root);
