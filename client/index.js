import axios from 'axios';
import inquirer from 'inquirer';
import MerkleTree from '../utils/MerkleTree.js';
import niceList from '../utils/niceList.json' assert { type: 'json' };

const serverUrl = 'http://localhost:1225';
const merkleTree = new MerkleTree(niceList);

async function main() {
  inquirer.prompt({ name: 'name', message: 'What is your name?'}).then(async ({name}) => {

    const leaf = name; 
    const index = niceList.findIndex(n => n === leaf);
    const proof = merkleTree.getProof(index);
    const { data: gift } = await axios.post(`${serverUrl}/gift`, {
      leaf,
      proof
    });
  
    console.log({ gift });
  });
}

main();