const MerkleTree = require('./MerkleTree');
const niceList = require('./niceList');
const verifyProof = require('./verifyProof');

// Crypto requires
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");
const { toHex } = require("ethereum-cryptography/utils")


// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

// get the root
const root = merkleTree.getRoot();

const MERKLE_ROOT = '9921bb5f867ff842ba441098b571875deb89efffc0569e39e764e8a8b77a84b7';

// find the proof that norman block is in the list 
const name = 'Norman Block';
const index = niceList.findIndex(n => n === name);
const proof = merkleTree.getProof(index);

// verify proof against the Merkle Root
console.log(`Of ${name} veryfyProof()=`, verifyProof(proof, name, root) ); // true, Norman Block is in the list!
console.log(`using MERKLE_ROOT constant: veryfyProof()=`, verifyProof(proof, name, MERKLE_ROOT) ); // true, Norman Block is in the list!
console.log('The index of Norman Block is', index);
console.log(' ');

// TRY IT OUT: what happens if you try a name not in the list, or a fake proof?
// TEST 
const name2 = 'Jose A. Martinez JAM';
const index2 = niceList.findIndex(m => m === name2);
const proof2 = merkleTree.getProof(index2);
console.log(`Of ${name2} veryfyProof()=`, verifyProof(proof2, name2, root) ); // true, Norman Block is in the list!
console.log('The index of Jose A. Martinez JAM is', index2);
console.log(' ');

const name3 = 'Jse Basto';
const index3 = niceList.findIndex(m => m === name3);
const proof3 = merkleTree.getProof(index3);
console.log(`Of ${name3} veryfyProof()=`, verifyProof(proof3, name3, root) ); // true, Norman Block is in the list!
console.log('The index of Jse Basto is', index3);
console.log(' ');

const listInBytes = utf8ToBytes(niceList.toString());
const keccakHash = keccak256(listInBytes);
console.log('toHex(keccak256(niceList))=', toHex(keccakHash));
console.log('                   getRoot=', merkleTree.getRoot());
console.log('                      root=', root);
console.log('               proof(1000)=', JSON.stringify(merkleTree.getProof(index2)));
console.log('             	verifyProof()=', verifyProof(proof2, name2, root));
// Giving a name that doesnt exist
/*
const name = 'Pedro Solis';
const index = niceList.findIndex(n => n === name);
const proof = merkleTree.getProof(index);
*/
