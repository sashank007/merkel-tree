# merkel-tree

## Javascript package to create a merkel tree and and do operations on it.

### This package has 3 functions : 

**make** - The Merkel tree is created on the string array instantiated with the class.  
**getRoot** - Returns the hash of the Merkel Root.  
**fetchOldTransaction** - Returns all the previous transactions which occurred on the tree as a dictionary.  


### Installation

`npm i merkel-tree`

### Usage

`var newTree = new MerkelTree(["a","b","c"])`  
`newTree.make()`
`newTree.getRoot()`
