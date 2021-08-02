import "./index.scss";

const axios = require('axios');

const INFURA_ENDPOINT = "https://mainnet.infura.io/v3/e9f53f58de45418da8224a86b51092f9"; // <-- insert your Infura Endpoint

document.getElementById("latestBlock").addEventListener('click', () => {  
axios.post(INFURA_ENDPOINT, 
  {
    "jsonrpc": "2.0",
    "method": "eth_blockNumber",
    "params": [],
    "id": 1
}).then((response) => {
  console.log(parseInt(response.data.result));
  document.getElementById("block").innerHTML=parseInt(response.data.result);
});
});


document.getElementById("block").addEventListener('click', () => {  
axios.post(INFURA_ENDPOINT, 
  {
    "jsonrpc": "2.0",
    "method": "eth_getBlockByNumber",
    "params": [
            "latest",
            true
        ],
    "id": 1
}).then((response) => {
  const block = response.data.result;
  const returnData = "Block Height: " + parseInt(block.number) + "<br><br>"
+ "Timestamp: " + block.timestamp + "<br><br>"
+ "Number of Transactions: " + parseInt(block.transactions.length) + "<br><br>"
+ "Mined By : " + block.miner + "<br><br>"
+ "Difficulty : " + parseInt(block.difficulty) + "<br><br>"
+ "Total Difficulty : " + parseInt(block.totalDifficulty) + "<br><br>"
+ "Size : " + parseInt(block.size) + " bytes" + "<br><br>"
+ "Gas Used : " + parseInt(block.gasUsed)+ " (" + (block.gasUsed/block.gasLimit*100).toFixed(2) + ")%" + "<br><br>"
+ "Gas Limit : " + parseInt(block.gasLimit) + "<br><br>"
+ "Nonce :  " + block.nonce

  document.getElementById("blockDetails").innerHTML=returnData;
});
});

document.getElementById("addressSearch").addEventListener('click', () => {
const addrs = document.getElementById("exchange-address").value;
axios.post(INFURA_ENDPOINT, 
  {
    "jsonrpc": "2.0",
    "method": "eth_getBalance",
    "params": [
		addrs
            ,"latest"
        ],
    "id": 1
}).then((response) => {  
  document.getElementById("addressBalance").innerHTML = (parseInt(response.data.result)/10**18) + " Ether";
});
});
