import { ethers } from 'ethers';
//Address  & Contract ABI
const numberContractAddress ="0xa81f862Ee2EB76553F702B55fe8211e0A9A66b7D";
const numberContractABI = require('../artifacts/contracts/SimpleAuction.sol/SimpleAuction.json');
const call = document.getElementById("call");
const getBidder = document.getElementById("getBidder");
const bid = document.getElementById("bid");




const provider = new ethers.providers.Web3Provider(window.ethereum,"any");

provider.send('eth_requestAccounts',[]);




/*  Use the above one or the below one to for the live testnet ether */
// const provider = new ethers.providers.JsonRpcProvider("https://speedy-nodes-nyc.moralis.io/75f0ef7977d9af455fe92ea3/eth/rinkeby");


// var provider = ethers.providers.getDefaultProvider('rinkeby');


// const numberContract = new ethers.Contract(numberContractAddress, numberContractABI.abi, provider);
// console.log(provider);

provider.getBlockNumber().then((result) => {
    console.log("Current block number: " + result);
});

const numberContract = new ethers.Contract(numberContractAddress, numberContractABI.abi, provider.getSigner());


call.addEventListener("click", async ()=>{
    console.log("Hello From Click!");
    await connectToWallet();
    
    const n = await numberContract.address;
    const bid =  await numberContract.beneficiary();
    // const n =  await numberContract.highestBid();
    // const num = await numberContract.greet();
    console.log(n.toString());
    console.log(bid.toString());
});


getBidder.addEventListener("click", async ()=>{
    
    const n = await numberContract.address;
    const bidAmount =  await numberContract.highestBid();
    const bidder =  await numberContract.highestBidder();

    console.log(bidder.toString(),bidAmount.toString());
});

bid.addEventListener("click", async ()=>{
    
    const accounts = await getAccount();
    await sendTransaction(accounts);
    
    const n = await numberContract.address;
    const bidAmount =  await numberContract.highestBid();
    const bidder =  await numberContract.highestBidder();

    console.log(bidder.toString(),bidAmount.toString());

    
    
});


async function getAccount() {
    var accounts = await provider.send('eth_requestAccounts');
    // console.log(accounts);
    return accounts;
}

async function sendTransaction(accounts){
    console.log(accounts);
    var transaction = await provider.send('eth_sendTransaction',[
        {
            from: accounts[0],
            to: '0xfB87072b80938302FBc22494fd892510F1C0E638',
        }]
    );
    console.log(transaction);
}

async function connectToWallet(){
    provider.send('eth_requestAccounts');
}







