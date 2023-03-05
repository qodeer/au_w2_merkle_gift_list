const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';
const merkleTree = new MerkleTree(niceList);

async function main() {
  const leaf = 'Norman Block';
  const index = niceList.findIndex(n => n === leaf);
  const proof = merkleTree.getProof(index);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    leaf,
    proof
  });

  console.log({ gift });
}

main();