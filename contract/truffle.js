const HDWalletProvider = require('truffle-hdwallet-provider')

// First index: 0x5d1D6ff025e471E0a76058FdE9eC01e979d749Ac
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider('bid poem economy code way fork solar around piano joke surge loud', 'https://ropsten.infura.io/Pjuqwe1f8zc0UUwAkZRJ'),
      network_id: '2',
      gas: 6500000,
      gasPrice: 60000000000
    },
    rinkeby: {
      provider: new HDWalletProvider('bid poem economy code way fork solar around piano joke surge loud', 'https://rinkeby.infura.io/Pjuqwe1f8zc0UUwAkZRJ'),
      network_id: '3',
      gas: 6500000,
      gasPrice: 60000000000
    }
  }
};
