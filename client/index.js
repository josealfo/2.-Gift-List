const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

const readline = require("readline");

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  
  // My Merkle Root with my name in the gift list
  const MERKLE_ROOT = '9921bb5f867ff842ba441098b571875deb89efffc0569e39e764e8a8b77a84b7';
  
  //copying exactly from example.js
  const MerkleTree  = require('../utils/MerkleTree');
  const niceList    = require('../utils/niceList');
  const verifyProof = require('../utils/verifyProof');
  const merkleTree = new MerkleTree(niceList);

  // Names to search on the list
  let    name1 = 'Alexander Franey (wrong name, because of these parenthesis!)';
  const index1 = niceList.findIndex(n => n === name1);
  let   proof1 = merkleTree.getProof(index1);  
  let    name2 = 'Alexander Franey';
  const index2 = niceList.findIndex(n => n === name2);
  let   proof2 = merkleTree.getProof(index2);
  let    name3 = 'Jose A. Martinez JAM';
  const index3 = niceList.findIndex(n => n === name3);
  let   proof3 = merkleTree.getProof(index3);  
  let    name4 = 'Norman Block';
  const index4 = niceList.findIndex(n => n === name4);
  let   proof4 = merkleTree.getProof(index4);

  console.log(' ');
  console.log(' ');
  console.log(' ');
  console.log('                 ******************************');
  console.log('                 *  Welcome to THE GIFT LIST  *');
  console.log('                 ******************************');
  console.log(' ');
  console.log('Four proofs are being sent to the server, receiving the following responses:');
  console.log(' ');

  // Prepare strings to send over the network
  name1  = JSON.stringify(name1);
  name2  = JSON.stringify(name2);
  name3  = JSON.stringify(name3);
  name4  = JSON.stringify(name4);
  proof1 = JSON.stringify(proof1);
  proof2 = JSON.stringify(proof2);
  proof3 = JSON.stringify(proof3);
  proof4 = JSON.stringify(proof4);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name1: name1,
    name2: name2,
    name3: name3,
    name4: name4,
    proof1: proof1,  // TODO: add request body parameters here!
    proof2: proof4,  //<== SHOULD NOT VERIFY:  NOT sending proof2
    proof3: proof3,
    proof4: proof4  
  });

  function beautifyProof(proof) {
    //console.log(proof);
    let rStr = '';
    for(let i =0; i<45; i++) {
      rStr = rStr + proof[i];
    } 
    return (rStr + '...');
  }

  function responseMsg(boolean) {
    return (boolean) ?  `(${boolean}) You got a toy robot!` : `You are not on the list, sorry...`;
  }

  //---------------- RESPONSE ----------------------- 
  console.log('1.', name1);
  console.log('   proof:', proof1);
  console.log('   RESPONSE IS:', responseMsg(gift.response1));
  console.log(' ');
  console.log('2.', name2, 'Right name and wrong proof!');
  console.log('   fake proof:', beautifyProof(proof4));
  console.log('   RESPONSE IS:', responseMsg(gift.response2));
  console.log(' ');
  console.log('3.', name3);
  console.log('   proof:', beautifyProof(proof3));
  console.log('   RESPONSE IS:', responseMsg(gift.response3));
  console.log(' ');
  console.log('4.', name4);
  console.log('   proof:', beautifyProof(proof4));
  console.log('   RESPONSE IS:', responseMsg(gift.response4));
  console.log(' ');
  console.log(' ');
  console.log(' ');
}

main();
