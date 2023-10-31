import Tree from "./modules/tree.js";

const nodes = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const newTree = new Tree(nodes);
// newTree.insert(79);
// newTree.insert(80);
Tree.prettyPrint(newTree.root);
// newTree.delete(67);
newTree.delete(8);
Tree.prettyPrint(newTree.root);
