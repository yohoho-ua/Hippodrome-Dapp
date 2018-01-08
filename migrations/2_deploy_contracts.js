//var ConvertLib = artifacts.require("./ConvertLib.sol");
//var MetaCoin = artifacts.require("./MetaCoin.sol");
var Hippodrome = artifacts.require("./Hippodrome.sol");
//var Owned = artifacts.require("Owned");

module.exports = function(deployer) {
  //deployer.deploy(ConvertLib);
  //deployer.link(ConvertLib, MetaCoin);
  //deployer.deploy(MetaCoin);
  //deployer.deploy(Owned);
  //deployer.link(Owned, Hippodrome);
  deployer.deploy(Hippodrome);
};
