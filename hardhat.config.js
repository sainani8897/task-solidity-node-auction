require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks:{
    localhost:{
      url:"http://127.0.0.1:8545/",
      accounts:["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"]      
    },
    rinkeby: {
      url: "https://speedy-nodes-nyc.moralis.io/75f0ef7977d9af455fe92ea3/eth/rinkeby",
      accounts: ['831e39ec29e467e101c7cc98074bfdf42094ea347b6050f3f30af5333b900347']
    }
  }
};
