This is an app aimed to learn blockchain developement. We use Merkle Trees and cryptography to authenticate a user: if the user is on the list, a gift will be given. Otherwise not.

The app is in text, using the console. It consists of a server and a client who both have to be run:
   The server by typing:  `node server/index`.  from the command line.
   And once the server is up, the client can be started by typing:  `node client/index` (also from the command line in another terminal or window).

This will start a process, first in the client generating names and proofs that will be sent for verification...
     The following attemps will be made:
     1) A name which is not in the list
     2) A name which is on the list, wth a proof that does not verify
     3) A name which is on the list with a valid proof. I manually altered the list, adding this nane!
     4) Another name which is on the list, and his valid proof (also receiving a gift)

The output will be shown on the screen and the user will see that the first two attempts failed, and the last two succeded. The list of names is in utils/niceList.json, and the implementation of the MerkleTree is in utils/MerkleTree.js. I used this class, as seen in utils/example.js to load a Merkle Tree of the altereed niceList.json and got a root. Instead of storing the whole list, we only store this tree's root (which is a hash), saving much space.

Following is the previous README.md, in case I forgot something:

# Gift List

To get started with the repository, clone it and then run `npm install` in the top-level directory to install the depedencies.

There are three folders in this repository:

## Client

You can run the client from the top-level directory with `node client/index`. This file is a script which will send an HTTP request to the server.

Think of the client as the _prover_ here. It needs to prove to the server that some `name` is in the `MERKLE_ROOT` on the server. 

## Server

You can run the server from the top-level directory with `node server/index`. This file is an express server which will be hosted on port 1225 and respond to the client's request.

Think of the server as the _verifier_ here. It needs to verify that the `name` passed by the client is in the `MERKLE_ROOT`. If it is, then we can send the gift! 

## Utils

There are a few files in utils:

- The `niceList.json` which contains all the names of the people who deserve a gift this year (this is randomly generated, feel free to add yourself and others to this list!)
- The `example.js` script shows how we can generate a root, generate a proof and verify that some value is in the root using the proof. Try it out from the top-level folder with `node/example.js`
- The `MerkleTree.js` should look familiar from the Merkle Tree module! This one has been modified so you should not have to deal with any crypto type conversion. You can import this in your client/server
- The `verifyProof.js` should also look familiar. This was the last stage in the module. You can use this function to prove a name is in the merkle root, as show in the example.
