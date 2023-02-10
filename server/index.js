const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
// This Merkle Root includes my name in the list!!!
const MERKLE_ROOT = '9921bb5f867ff842ba441098b571875deb89efffc0569e39e764e8a8b77a84b7';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const { name1, name2, name3, name4, proof1, proof2, proof3, proof4, body } = req.body;

  const n1 = JSON.parse(name1);
  const n2 = JSON.parse(name2);
  const n3 = JSON.parse(name3);
  const n4 = JSON.parse(name4);
  const p1 = JSON.parse(proof1);
  const p2 = JSON.parse(proof2);
  const p3 = JSON.parse(proof3);
  const p4 = JSON.parse(proof4);

  console.log('Verifying the received proofs...' );
  const v1 = verifyProof(p1, n1, MERKLE_ROOT);  
  const v2 = verifyProof(p2, n2, MERKLE_ROOT);  
  const v3 = verifyProof(p3, n3, MERKLE_ROOT);  
  const v4 = verifyProof(p4, n4, MERKLE_ROOT);  

  // TODO: prove that a name is in the list 
  // Here we send the response
  res.json({ response1: v1, response2: v2, response3: v3, response4: v4});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
