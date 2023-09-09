require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/INFURA API KEY",
      chainId: 5,
      accounts: ['Private Key']
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/INFURA API KEY",
      chainId: 11155111,
      accounts: ['Private Key']
    },
  
    
  },
};
