var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Willdo = artifacts.require("./Willdo.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Willdo);
};
