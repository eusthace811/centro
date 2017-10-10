var CentroCoin = artifacts.require("./CentroCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(CentroCoin);
};
